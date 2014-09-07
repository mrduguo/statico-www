import org.apache.commons.io.FileUtils
import org.gradle.BuildResult
import org.gradle.api.Project


class Builder {


    static def bldLog(def msg) {
        println(new Date().toLocaleString() + ' ' + msg)
    }

    static def bldFail(def msg) {
        throw new RuntimeException(new Date().toLocaleString() + ' ' + msg)
    }

    static def bldExecCommand(cmd, ignoreError = false, basedDir = null,logInfo=true) {
        if(logInfo){
            bldLog(" executing: $cmd")
        }
        def proc = cmd.execute((String[]) null, basedDir)
        def finishedReading = false
        def streamClosedCounter = new java.util.concurrent.CountDownLatch(2)
        def result = new StringBuilder()
        Thread.start {
            proc.in.eachLine { line ->
                if(logInfo) {
                    println "STD: " + line
                }
                result.append(line)
                result.append("\n")
            }
            streamClosedCounter.countDown()
        }
        Thread.start {
            proc.err.eachLine { line ->
                result.append(line)
                result.append("\n")
                println "ERR: " + line
            }
            streamClosedCounter.countDown()
        }
        proc.waitFor()
        streamClosedCounter.await(5, java.util.concurrent.TimeUnit.SECONDS)
        if(logInfo){
            bldLog(" command finished with exit value: ${proc.exitValue()}")
        }
        if (proc.exitValue()) {
            if (ignoreError)
                return result
            else
                bldFail("exec $cmd failed with status code ${proc.exitValue()}")
        }
        result
    }

}

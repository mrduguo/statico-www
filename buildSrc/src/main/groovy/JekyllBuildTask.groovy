import org.apache.commons.io.FileUtils
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction


class JekyllBuildTask extends DefaultTask {
    @TaskAction
    def action() {
        Builder.bldExecCommand(
                "jekyll build --conf ${project.projectDir.absolutePath}/jekyll/config.yml"
        )
    }
}

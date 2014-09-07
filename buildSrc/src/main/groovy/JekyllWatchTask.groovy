import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

class JekyllWatchTask extends DefaultTask {
    @TaskAction
    def action() {
        Builder.bldExecCommand(
                "jekyll serve --watch --conf ${project.projectDir.absolutePath}/jekyll/config.yml"
        )
    }
}

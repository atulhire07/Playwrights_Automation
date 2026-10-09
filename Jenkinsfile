
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results --clean -o allure-report'
            }
        }

        stage('Create Allure ZIP') {
            steps {
                bat '''
                    if exist allure-report.zip del /f /q allure-report.zip
                    powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Path 'allure-report\\*' -DestinationPath 'allure-report.zip' -Force"
                '''
            }
        }

        stage('Publish Allure Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Report',
                    reportTitles: 'Playwright Allure Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'allure-report/**, allure-report.zip',
                allowEmptyArchive: true
            )

            script {
                try {
                    emailext(
                        to: 'atulhire55@gmail.com',
                        subject: "Playwright Test - Build #${BUILD_NUMBER} - ${currentBuild.currentResult}",
                        mimeType: 'text/html',
                        body: """
                            <html>
                            <body>
                                <h2>Playwright Automation Test Results</h2>

                                <p><b>Project:</b> SauceDemo-Playwright</p>
                                <p><b>Build Number:</b> #${BUILD_NUMBER}</p>
                                <p><b>Build Status:</b> ${currentBuild.currentResult}</p>

                                <hr>

                                <h3>Test Execution</h3>
                                <p>Playwright automation execution has completed.</p>

                                <h3>Allure Report</h3>
                                <p>
                                    <a href="${BUILD_URL}">
                                        Open Jenkins Build
                                    </a>
                                </p>

                                <p>
                                    Open the Allure Report link on the Jenkins
                                    build page to view detailed test results.
                                </p>

                                <p>
                                    The Allure ZIP is available under the
                                    archived artifacts of this build.
                                </p>

                                <hr>

                                <p>
                                    <b>Jenkins Build URL:</b><br>
                                    <a href="${BUILD_URL}">${BUILD_URL}</a>
                                </p>

                                <p>Regards,<br>Jenkins CI/CD</p>
                            </body>
                            </html>
                        """
                    )

                    echo 'Email notification step completed.'

                } catch (Exception e) {
                    echo "Email notification failed: ${e.getMessage()}"
                }
            }
        }
    }
}

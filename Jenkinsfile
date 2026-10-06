pipeline {
    agent any

    stages {

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

        stage('Create Allure HTML Report') {
            steps {
                bat 'allure generate allure-results -o allure-report --clean'
            }
        }

        stage('Create Allure ZIP') {
            steps {
                powershell '''
                    if (Test-Path "allure-report.zip") {
                        Remove-Item "allure-report.zip" -Force
                    }

                    Compress-Archive `
                        -Path "allure-report\\*" `
                        -DestinationPath "allure-report.zip" `
                        -Force
                '''
            }
        }
    }

    post {

        always {

            allure(
                allureVersion: '3',
                includeProperties: false,
                results: [[path: 'allure-results']]
            )

            archiveArtifacts(
                artifacts: 'allure-report.zip',
                allowEmptyArchive: true
            )

            emailext(
                to: 'atulhire55@gmail.com',
                subject: "SauceDemo Playwright | Build #${BUILD_NUMBER} | ${currentBuild.currentResult}",
                mimeType: 'text/html',
                body: """
                    <html>
                    <body>

                    <h2>SauceDemo Playwright Automation Report</h2>

                    <p><b>Build Number:</b> ${BUILD_NUMBER}</p>
                    <p><b>Status:</b> ${currentBuild.currentResult}</p>
                    <p><b>Job:</b> ${JOB_NAME}</p>

                    <hr>

                    <p>
                    Playwright automation execution has completed.
                    </p>

                    <p>
                    The Allure HTML report is attached as:
                    <b>allure-report.zip</b>
                    </p>

                    <p>
                    Extract the ZIP and open <b>index.html</b>.
                    </p>

                    </body>
                    </html>
                """,
                attachmentsPattern: 'allure-report.zip'
            )
        }
    }
}
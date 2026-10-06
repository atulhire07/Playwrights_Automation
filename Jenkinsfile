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

        stage('Create Allure ZIP') {
            steps {
                powershell '''
                    if (Test-Path "allure-report.zip") {
                        Remove-Item "allure-report.zip" -Force
                    }

                    if (Test-Path "allure-results") {
                        Compress-Archive `
                            -Path "allure-results\\*" `
                            -DestinationPath "allure-report.zip" `
                            -Force
                    }
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
                        <p><b>Build:</b> #${BUILD_NUMBER}</p>
                        <p><b>Status:</b> ${currentBuild.currentResult}</p>
                        <p><b>Job:</b> ${JOB_NAME}</p>
                        <p>Playwright automation execution has completed.</p>
                        <p>Allure results are attached as <b>allure-report.zip</b>.</p>
                    </body>
                    </html>
                """,
                attachmentsPattern: 'allure-report.zip'
            )
        }
    }
}
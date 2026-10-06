pipeline {
    agent any

    stages {

        // 1. Checkout code from GitHub
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // 2. Install Node dependencies
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        // 3. Install Playwright browsers
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        // 4. Run Playwright tests
        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        // 5. Generate Allure HTML report
        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results -o allure-report'
            }
        }

        // 6. Create Allure ZIP
        stage('Create Allure ZIP') {
            steps {
                bat '''
                    if exist allure-report.zip del /f /q allure-report.zip
                    powershell -Command "Compress-Archive -Path allure-report -DestinationPath allure-report.zip -Force"
                '''
            }
        }
    }

    post {

        always {

            // Archive Allure report and ZIP
            archiveArtifacts artifacts: 'allure-report/**, allure-report.zip',
                             allowEmptyArchive: true

            // Send email with Allure ZIP attachment
            emailext(
                to: 'atulhire55@gmail.com',
                subject: "Playwright Test - Build #${BUILD_NUMBER} - ${currentBuild.currentResult}",
                body: """
                    <html>
                    <body>

                    <h2>Playwright Automation Test Results</h2>

                    <p><b>Project:</b> SauceDemo-Playwright</p>

                    <p><b>Build Number:</b> #${BUILD_NUMBER}</p>

                    <p><b>Build Status:</b> ${currentBuild.currentResult}</p>

                    <p>
                        Playwright automation execution has been completed.
                    </p>

                    <p>
                        <b>Allure Report:</b>
                        Please find the Allure HTML report attached as a ZIP file.
                    </p>

                    <p>
                        <b>Jenkins Build:</b><br>
                        <a href="${BUILD_URL}">
                            Open Jenkins Build
                        </a>
                    </p>

                    <br>

                    <p>Regards,<br>
                    Jenkins CI/CD</p>

                    </body>
                    </html>
                """,
                mimeType: 'text/html',
                attachmentsPattern: 'allure-report.zip'
            )
        }
    }
}
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
            script {
                archiveArtifacts(
                    artifacts: 'allure-report/**,allure-report.zip',
                    allowEmptyArchive: true
                )

                emailext(
                    to: 'atulhire55@gmail.com',
                    subject: "SauceDemo Playwright - Build #${BUILD_NUMBER} - ${currentBuild.currentResult}",
                    mimeType: 'text/plain',
                    body: """Hello,

Playwright automation execution has completed.

Project: ${JOB_NAME}
Build Number: #${BUILD_NUMBER}
Build Status: ${currentBuild.currentResult}

Jenkins Build:
${BUILD_URL}

Allure Report:
${BUILD_URL}Allure_Report/

The Allure report ZIP is attached when available.

Regards,
Jenkins CI/CD
""",
                    attachmentsPattern: 'allure-report.zip',
                    attachLog: false
                )
            }
        }
    }
}

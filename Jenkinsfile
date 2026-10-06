pipeline {

    agent {
        label 'built-in'
    }

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

        stage('Generate Allure HTML Report') {
            steps {

                powershell '''
                    if (Test-Path "allure-report") {
                        Remove-Item "allure-report" -Recurse -Force
                    }
                '''

                bat 'npx allure generate allure-results -o allure-report'
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

            archiveArtifacts(
                artifacts: 'allure-report.zip',
                allowEmptyArchive: true
            )

emailext(
    to: 'atulhire55@gmail.com',
    from: 'atulhire55@gmail.com',
    replyTo: 'atulhire55@gmail.com',
    subject: "SauceDemo Jenkins Test - Build #${BUILD_NUMBER}",
    mimeType: 'text/html',
    body: """
        <html>
        <body>
            <h2>SauceDemo Jenkins Email Test</h2>
            <p>Build: #${BUILD_NUMBER}</p>
            <p>Status: ${currentBuild.currentResult}</p>
            <p>This is a test email from the Jenkins Pipeline.</p>
        </body>
        </html>
    """
)
            
        }
    }
}
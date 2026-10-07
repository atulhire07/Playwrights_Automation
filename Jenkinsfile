pipeline {
    agent any

    stages {

        // ==========================================
        // 1. CHECKOUT SOURCE CODE
        // ==========================================
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ==========================================
        // 2. INSTALL NPM DEPENDENCIES
        // ==========================================
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        // ==========================================
        // 3. INSTALL PLAYWRIGHT BROWSERS
        // ==========================================
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        // ==========================================
        // 4. RUN PLAYWRIGHT TESTS
        // ==========================================
        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        // ==========================================
        // 5. GENERATE ALLURE REPORT
        // ==========================================
        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results -o allure-report'
            }
        }

        // ==========================================
        // 6. CREATE ALLURE ZIP
        // ==========================================
        stage('Create Allure ZIP') {
            steps {
                bat '''
                    if exist allure-report.zip del /f /q allure-report.zip

                    powershell -Command "Compress-Archive -Path allure-report -DestinationPath allure-report.zip -Force"
                '''
            }
        }

        // ==========================================
        // 7. PUBLISH ALLURE REPORT IN JENKINS
        // ==========================================
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

    // ==============================================
    // POST BUILD ACTIONS
    // ==============================================
    post {

        always {

            // ======================================
            // ARCHIVE ALLURE REPORT + ZIP
            // ======================================
            archiveArtifacts(
                artifacts: 'allure-report/**, allure-report.zip',
                allowEmptyArchive: true
            )

            // ======================================
            // SEND EMAIL
            // ======================================
            emailext(
                to: 'atulhire55@gmail.com',

                subject: "Playwright Test - Build #${BUILD_NUMBER} - ${currentBuild.currentResult}",

                body: """
                    <html>
                    <body>

                    <h2>Playwright Automation Test Results</h2>

                    <p>
                        <b>Project:</b> SauceDemo-Playwright
                    </p>

                    <p>
                        <b>Build Number:</b> #${BUILD_NUMBER}
                    </p>

                    <p>
                        <b>Build Status:</b> ${currentBuild.currentResult}
                    </p>

                    <hr>

                    <h3>Test Execution</h3>

                    <p>
                        Playwright automation execution has been completed.
                    </p>

                    <h3>Allure Report</h3>

                    <p>
                        <a href="${BUILD_URL}">
                            Open Jenkins Build
                        </a>
                    </p>

                    <p>
                        The Allure report is available under the
                        <b>Allure Report</b> link on the Jenkins build page.
                    </p>

                    <h3>Allure ZIP</h3>

                    <p>
                        The complete Allure report is attached to this email:
                    </p>

                    <p>
                        <b>📎 allure-report.zip</b>
                    </p>

                    <hr>

                    <p>
                        <b>Jenkins Build URL:</b><br>
                        <a href="${BUILD_URL}">
                            ${BUILD_URL}
                        </a>
                    </p>

                    <br>

                    <p>
                        Regards,<br>
                        <b>Jenkins CI/CD</b>
                    </p>

                    </body>
                    </html>
                """,

                mimeType: 'text/html',

                // Attach Allure ZIP
                attachmentsPattern: 'allure-report.zip'
            )
        }
    }
}
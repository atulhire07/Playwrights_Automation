pipeline {
    agent any

    stages {

        // ==========================================
        // 1. CHECKOUT
        // ==========================================
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ==========================================
        // 2. INSTALL DEPENDENCIES
        // ==========================================
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        // ==========================================
        // 3. INSTALL PLAYWRIGHT
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
        // 6. CREATE + VALIDATE ALLURE ZIP
        // ==========================================
        stage('Create Allure ZIP') {
            steps {
                bat '''
                    echo ==========================================
                    echo Creating Allure ZIP
                    echo ==========================================

                    if exist allure-report.zip del /f /q allure-report.zip

                    if not exist "C:\\Program Files\\7-Zip\\7z.exe" (
                        echo ERROR: 7-Zip is not installed at:
                        echo C:\\Program Files\\7-Zip\\7z.exe
                        exit /b 1
                    )

                    "C:\\Program Files\\7-Zip\\7z.exe" a -tzip allure-report.zip ".\\allure-report\\*"

                    if not exist allure-report.zip (
                        echo ERROR: allure-report.zip was not created.
                        exit /b 1
                    )

                    echo ==========================================
                    echo Validating Allure ZIP
                    echo ==========================================

                    "C:\\Program Files\\7-Zip\\7z.exe" t allure-report.zip

                    if errorlevel 1 (
                        echo ERROR: Allure ZIP validation FAILED.
                        exit /b 1
                    )

                    echo ==========================================
                    echo Allure ZIP created and validated successfully.
                    echo ==========================================
                '''
            }
        }

        // ==========================================
        // 7. PUBLISH ALLURE REPORT
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
    // POST BUILD
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
                        Open the Jenkins build to access the Allure Report:
                    </p>

                    <p>
                        <a href="${BUILD_URL}">
                            <b>Open Jenkins Build</b>
                        </a>
                    </p>

                    <p>
                        The Jenkins build page contains the
                        <b>Allure Report</b> link.
                    </p>

                    <h3>Allure ZIP</h3>

                    <p>
                        A validated Allure report ZIP file is attached:
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

                // Attach validated ZIP
                attachmentsPattern: 'allure-report.zip'
            )
        }
    }
}
pipeline {
    agent any

    stages {

        // ==================================================
        // 1. CHECKOUT
        // ==================================================
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ==================================================
        // 2. INSTALL DEPENDENCIES
        // ==================================================
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        // ==================================================
        // 3. INSTALL PLAYWRIGHT BROWSERS
        // ==================================================
        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        // ==================================================
        // 4. RUN PLAYWRIGHT TESTS
        // ==================================================
        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

        // ==================================================
        // 5. GENERATE ALLURE HTML REPORT
        // ==================================================
        stage('Generate Allure Report') {
            steps {
                bat 'npx allure generate allure-results -o allure-report'
            }
        }

        // ==================================================
        // 6. CREATE + VALIDATE ZIP
        // ==================================================
        stage('Create Allure ZIP') {
            steps {
                bat '''
                    echo ==========================================
                    echo Checking 7-Zip
                    echo ==========================================

                    if not exist "C:\\Program Files\\7-Zip\\7z.exe" (
                        echo ERROR: 7-Zip is not installed.
                        exit /b 1
                    )

                    if exist allure-report.zip (
                        del /f /q allure-report.zip
                    )

                    echo ==========================================
                    echo Creating Allure ZIP
                    echo ==========================================

                    "C:\\Program Files\\7-Zip\\7z.exe" a -tzip allure-report.zip ".\\allure-report\\*"

                    if not exist allure-report.zip (
                        echo ERROR: Allure ZIP was not created.
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

                    echo Allure ZIP created and validated successfully.
                '''
            }
        }

        // ==================================================
        // 7. PUBLISH ALLURE HTML REPORT IN JENKINS
        // ==================================================
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

        // ==================================================
        // 8. CREATE EMAIL HTML SUMMARY
        // ==================================================
        stage('Create Email Summary') {
            steps {
                powershell '''
                    $resultsFile = "allure-results"

                    $files = Get-ChildItem $resultsFile -Filter "*.json" -ErrorAction SilentlyContinue

                    $passed = 0
                    $failed = 0
                    $broken = 0
                    $skipped = 0
                    $total = 0

                    foreach ($file in $files) {
                        try {
                            $json = Get-Content $file.FullName -Raw | ConvertFrom-Json

                            if ($json.status) {
                                $total++

                                switch ($json.status.ToLower()) {
                                    "passed"  { $passed++ }
                                    "failed"  { $failed++ }
                                    "broken"  { $broken++ }
                                    "skipped" { $skipped++ }
                                }
                            }
                        }
                        catch {
                            Write-Host "Skipping invalid JSON: $($file.Name)"
                        }
                    }

                    $duration = ""

                    $html = @"
                    <html>
                    <body style="font-family: Arial, sans-serif;">

                    <h2>Playwright Automation Test Results</h2>

                    <table border="1" cellpadding="8" cellspacing="0">
                        <tr>
                            <td><b>Project</b></td>
                            <td>SauceDemo-Playwright</td>
                        </tr>

                        <tr>
                            <td><b>Build</b></td>
                            <td>#${env:BUILD_NUMBER}</td>
                        </tr>

                        <tr>
                            <td><b>Status</b></td>
                            <td>${env:BUILD_STATUS}</td>
                        </tr>

                        <tr>
                            <td><b>Total Tests</b></td>
                            <td>$total</td>
                        </tr>

                        <tr>
                            <td><b>Passed</b></td>
                            <td>$passed</td>
                        </tr>

                        <tr>
                            <td><b>Failed</b></td>
                            <td>$failed</td>
                        </tr>

                        <tr>
                            <td><b>Broken</b></td>
                            <td>$broken</td>
                        </tr>

                        <tr>
                            <td><b>Skipped</b></td>
                            <td>$skipped</td>
                        </tr>
                    </table>

                    <br>

                    <h3>Allure Report</h3>

                    <p>
                        <a href="${env:BUILD_URL}Allure_Report/">
                            <b>🚀 Open Full Allure HTML Report</b>
                        </a>
                    </p>

                    <p>
                        The complete Allure report is also attached as
                        <b>allure-report.zip</b>.
                    </p>

                    <hr>

                    <p>
                        <b>Jenkins Build:</b>
                        <a href="${env:BUILD_URL}">
                            Open Build #${env:BUILD_NUMBER}
                        </a>
                    </p>

                    <br>

                    <p>
                        Regards,<br>
                        <b>Jenkins CI/CD</b>
                    </p>

                    </body>
                    </html>
                    "@

                    Set-Content -Path "email-summary.html" -Value $html -Encoding UTF8

                    Write-Host "Email summary created successfully."
                '''
            }
        }
    }

    // ======================================================
    // POST BUILD
    // ======================================================
    post {

        always {

            // ==================================================
            // ARCHIVE REPORTS
            // ==================================================
            archiveArtifacts(
                artifacts: 'allure-report/**, allure-report.zip, email-summary.html',
                allowEmptyArchive: true
            )

            // ==================================================
            // SEND EMAIL
            // ==================================================
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
                        <b>Status:</b> ${currentBuild.currentResult}
                    </p>

                    <hr>

                    <h3>Allure Report</h3>

                    <p>
                        <a href="${BUILD_URL}Allure_Report/">
                            <b>🚀 Open Full Allure HTML Report</b>
                        </a>
                    </p>

                    <p>
                        The complete interactive Allure report is available
                        from the Jenkins build.
                    </p>

                    <h3>Download Report</h3>

                    <p>
                        <b>📎 allure-report.zip</b>
                    </p>

                    <p>
                        The ZIP contains the complete Allure HTML report,
                        including JavaScript, CSS and test result files.
                    </p>

                    <hr>

                    <p>
                        <b>Jenkins Build:</b><br>
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

                attachmentsPattern: 'allure-report.zip'
            )
        }
    }
}

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
                bat 'npx allure generate allure-results --output allure-report'
            }
        }

        stage('Create HTML Summary') {
            steps {
                powershell '''
                    $summaryPath = "allure-report/widgets/summary.json"
                    $outputPath = "allure-report.html"

                    if (!(Test-Path $summaryPath)) {
                        throw "Allure summary not found: $summaryPath"
                    }

                    $summary = Get-Content $summaryPath -Raw |
                        ConvertFrom-Json

                    $stats = $summary.statistic
                    $total = [int]$stats.total
                    $passed = [int]$stats.passed
                    $failed = [int]$stats.failed
                    $broken = [int]$stats.broken
                    $skipped = [int]$stats.skipped

                    $html = @"
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Playwright Allure Test Summary</title>
<style>
body {
    font-family: Arial, sans-serif;
    margin: 30px;
    color: #222;
}
h1 { color: #333; }
table {
    border-collapse: collapse;
    width: 100%;
    max-width: 700px;
}
th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}
th { background: #f2f2f2; }
</style>
</head>
<body>
<h1>Playwright Automation Test Summary</h1>
<p><b>Project:</b> SauceDemo-Playwright</p>
<p><b>Build Number:</b> #$env:BUILD_NUMBER</p>
<table>
<tr><th>Metric</th><th>Count</th></tr>
<tr><td>Total Tests</td><td>$total</td></tr>
<tr><td>Passed</td><td>$passed</td></tr>
<tr><td>Failed</td><td>$failed</td></tr>
<tr><td>Broken</td><td>$broken</td></tr>
<tr><td>Skipped</td><td>$skipped</td></tr>
</table>
<p>For the full interactive report, extract allure-report.zip
and open allure-report/index.html in your browser.</p>
</body>
</html>
"@

                    Set-Content -Path $outputPath -Value $html -Encoding UTF8
                    Write-Host "HTML summary created successfully."
                '''
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
                artifacts: 'allure-report.html, allure-report.zip, allure-report/**',
                allowEmptyArchive: true
            )

            script {
                try {
                    emailext(
                        to: 'atulhire55@gmail.com',
                        subject: "Playwright Test - Build #${BUILD_NUMBER} - ${currentBuild.currentResult}",
                        mimeType: 'text/html',
                        attachmentsPattern: 'allure-report.html, allure-report.zip',
                        body: """
                        <html>
                        <body style="font-family:Arial,sans-serif;">
                            <h2>Playwright Automation Test Results</h2>

                            <p><b>Project:</b> SauceDemo-Playwright</p>
                            <p><b>Build Number:</b> #${BUILD_NUMBER}</p>
                            <p><b>Build Status:</b> ${currentBuild.currentResult}</p>

                            <hr>

                            <h3>Email Attachments</h3>
                            <ul>
                                <li>allure-report.html - standalone HTML test summary</li>
                                <li>allure-report.zip - complete Allure report</li>
                            </ul>

                            <p>
                                To view the detailed interactive report,
                                download and extract allure-report.zip,
                                then open allure-report/index.html.
                            </p>

                            <p>
                                <a href="${BUILD_URL}">Open Jenkins Build</a>
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

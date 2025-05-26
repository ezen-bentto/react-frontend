pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK = credentials('discord-front') // 디스코드 웹훅 URL
        AWS_REGION = credentials('region')
        BUCKET_NAME = credentials('youth-bucket')
        DISTRIBUTION_ID = credentials('cloud-front-id')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // 최신 코드 가져오기
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // node_modules 폴더가 없으면 yarn install 실행
                    sh '''
                    if [ ! -d "node_modules" ]; then
                        echo "node_modules 디렉토리가 없으므로 yarn install을 실행합니다(강제)."
                        yarn install --legacy-peer-deps
                    else
                        echo "node_modules 디렉토리가 이미 존재하므로 yarn install을 건너뜁니다."
                    fi
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // 빌드 명령어 실행 (예: React 빌드)
                    sh 'yarn build'
                }
            }
        }

        stage('Deploy to S3') {
            steps {
                script {
                    // S3에 업로드 (과거 파일 삭제)
                    sh "aws s3 sync ./build/ s3://$BUCKET_NAME --delete"
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                script {
                    // CloudFront 캐시 무효화
                    sh "aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*'"
                }
            }
        }
    }

    post {
        success {
            script {
                // 배포 성공 시 디스코드 웹훅 알림
                def discordMessage = '{"content": "🚀 배포 성공: main 브랜치에 푸시된 최신 버전이 배포되었습니다!"}'
                sh "curl -X POST -H 'Content-Type: application/json' --data '${discordMessage}' $DISCORD_WEBHOOK"
            }
        }
        failure {
            script {
                // 배포 실패 시 디스코드 웹훅 알림
                def discordMessage = '{"content": "❌ 배포 실패: 배포에 실패했습니다."}'
                sh "curl -X POST -H 'Content-Type: application/json' --data '${discordMessage}' $DISCORD_WEBHOOK"
            }
        }
    }
}
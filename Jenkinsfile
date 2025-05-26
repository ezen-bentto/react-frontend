pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK = credentials('discord-front') // 디스코드 웹훅 URL을 환경 변수로 설정
        AWS_REGION = credentials('region')
        BUCKET_NAME = credentials('youth-bucket') // AWS S3 버킷을 환경 변수로 설정
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
                    sh 'yarn install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'yarn build'
                }
            }
        }

        stage('Deploy to S3') {
            steps {
                script {
                    // AWS 자격 증명 (액세스 키 및 비밀 키)을 withCredentials로 사용하여 환경 변수로 설정
                    withCredentials([[
                        $class: 'AmazonWebServicesCredentialsBinding',
                        accessKeyVariable: 'AWS_ACCESS_KEY_ID',  // 액세스 키 환경 변수
                        secretKeyVariable: 'AWS_SECRET_ACCESS_KEY', // 비밀 키 환경 변수
                        credentialsId: '2d462ab2-99f0-451a-9b7d-7f46afd7c6bf'  // Jenkins Credentials에서 설정한 AWS 자격 증명 ID
                    ]]) {
                        sh 'aws s3 sync ./dist/ s3://$BUCKET_NAME --delete'
                    }
                }
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                script {
                    sh "aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*'"
                }
            }
        }
    }

    post {
        success {
            script {
                def discordMessage = '{"content": "🚀 배포 성공: main 브랜치에 푸시된 최신 버전이 배포되었습니다!"}'
                sh """
                    curl -X POST -H 'Content-Type: application/json' --data '${discordMessage}' $DISCORD_WEBHOOK
                """
            }
        }
        failure {
            script {
                def discordMessage = '{"content": "❌ 배포 실패: 배포에 실패했습니다."}'
                sh """
                    curl -X POST -H 'Content-Type: application/json' --data '${discordMessage}' $DISCORD_WEBHOOK
                """
            }
        }
    }
}

pipeline {
    agent any
    tools {
        nodejs: 'node16'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm version'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

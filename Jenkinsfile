pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                nodejs(nodeJSInstallationName: 'node16') {
                      sh 'npm -v'
                      sh 'node -v'
                      sh 'yarn -v'
                      sh 'npm install'
                    }
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

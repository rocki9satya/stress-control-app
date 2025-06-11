pipeline {
  agent any

  environment {
    IMAGE_NAME = "satya03521/stress-control-ui"
    IMAGE_TAG = "prod-v3.0"
    DOCKER_COMPOSE_FILE = 'docker-compose.yaml'
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/rocki9satya/stress-control-app.git', branch: 'main'
      }
    }

    stage('Login to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
        }
      }
    }

    stage('Build & Deploy Prod') {
      steps {
        sh 'docker compose -f $DOCKER_COMPOSE_FILE build'
        sh 'docker compose -f $DOCKER_COMPOSE_FILE down'
        sh 'docker compose -f $DOCKER_COMPOSE_FILE up -d'
      }
    }
  }
}


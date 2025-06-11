pipeline {
  agent any

  environment {
    DOCKER_USER = "satya03521"
    FRONT_IMAGE_NAME = "${DOCKER_USER}/stress-control-ui"
    BACK_IMAGE_NAME = "${DOCKER_USER}/stress-control-backend"
    IMAGE_TAG = "${env.BRANCH_NAME}-v3.0"
    NAMESPACE = "${env.BRANCH_NAME}"
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/rocki9satya/stress-control-app.git', branch: "${env.BRANCH_NAME}"
      }
    }

    stage('Login to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
        }
      }
    }

    stage('Build & Push Images') {
      steps {
        sh """
          docker build -t $FRONT_IMAGE_NAME:$IMAGE_TAG ./frontend
          docker build -t $BACK_IMAGE_NAME:$IMAGE_TAG ./backend

          docker push $FRONT_IMAGE_NAME:$IMAGE_TAG
          docker push $BACK_IMAGE_NAME:$IMAGE_TAG
        """
      }
    }

    stage('Deploy to EKS') {
      steps {
        sh """
          kubectl get ns $NAMESPACE || kubectl create ns $NAMESPACE

          # Delete all resources in the namespace from k8s/ folder
          kubectl delete -n $NAMESPACE -f k8s/ --ignore-not-found

          # Apply fresh
          kubectl apply -n $NAMESPACE -f k8s/
        """
      }
    }
  }
}
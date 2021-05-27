# Вступ

Даний мікросервіс (клієнт) є частиною аплікації LinkedWay, яка була розроблена для дипломної роботи як сервіс для
полегшення процесу рекрутингу

# Використані технології

1. Angular 11

# Запуск проекту

## Використовуючи Docker - рекомендую використовувати саме цей спосіб

### Вимоги для запуску на Docker

1. Необхідно мати встановлений docker та docker-compose

#### Linux:

```bash
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```  

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```   

```bash
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```  

```bash
sudo groupadd docker
```

```bash
sudo usermod -aG docker $USER
```  

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```  

```bash
sudo chmod +x /usr/local/bin/docker-compose
```  

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```  

#### Windows:

Перейти за [посиланням](https://docs.docker.com/docker-for-windows/install/) та звантажити клієнт

#### Запуск:

Після цього можна запускати всю інфраструктуру за допомогою `docker`, виконавши наступну команду в корені проєкті:

```bash
docker-compose -f docker-compose.yml up -d
```

## Використовуючи локальні сервіси (Перед цим потрібно запустити сервер для LinkedWay)

### Linux

1. Встановлення NPM

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

```bash
sudo apt install nodejs
```

2. Встановлення Angular

```bash
npm install -g @angular/cli
```

### Windows

1. Необхідно встановити NPM, завантаживши клієнт за [посиланням](https://nodejs.org/en/download/)

2. Встановлення Angular

```bash
npm install -g @angular/cli
```

## Запуск

### IDE

Просто клікаємо на `старт` у середовищі розробки

### Термінал

```bash
ng serve
```

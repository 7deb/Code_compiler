FROM gcc:latest

WORKDIR /usr/src/app

COPY . .

CMD ["sh", "-c", "g++ user_code.cpp -o user_code && ./user_code"]

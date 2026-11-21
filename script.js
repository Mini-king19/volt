
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: Arial, sans-serif;
  color: #171522;
  background: #fff;
}

button, input, select {
  font: inherit;
}

button {
  cursor: pointer;
  border: none;
}

.header {
  min-height: 75px;
  padding: 14px 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
  border-bottom: 1px solid #eee;
  background: white;
}

.logo {
  font-size: 28px;
  font-weight: 900;
  color: #171522;
  text-decoration: none;
}

.logo span {
  color: #7954f6;
}

nav {
  display: flex;
  gap: 22px;
}

nav a {
  color: #555;
  text-decoration: none;
  font-size: 13px;
}

.header input {
  padding: 12px;
  border: none;
  background: #f4f2fa;
  border-radius: 8px;
}

.header button,
.mainBtn {
  background: #7954f6;
  color: white;
  padding: 12px 17px;
  border-radius: 7px;
  text-decoration: none;
}

.container {
  max-width: 1180px;
  margin: auto;
  padding: 25px;
}

.hero {
  background: #f0edff;
  border-radius: 15px;
  padding: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

.hero h1 {
  font-size: 42px;
  margin: 15px 0;
}

.hero p {
  color: #777;
  margin-bottom: 25px;
  line-height: 1.6;
}

.hero img {
  width: 45%;
  height: 260px;
  object-fit: contain;
}

section {
  margin-top: 40px;
}

h2 {
  margin-bottom: 20px;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.filters select {
  padding: 12px;
  background: #f4f2fa;
  border: 1px solid #eee;
  border-radius: 8px;
  min-width: 170px;
}

.products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 17px;
}

.card {
  position: relative;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 13px;
  transition: .2s;
  background: white;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px #21164b14;
}

.card img {
  width: 100%;
  height: 170px;
  object-fit: contain;
}

.card h3 {
  font-size: 15px;
  margin: 10px 0;
}

.card .category {
  color: #888;
  font-size: 11px;
}

.card .price {
  color: #7954f6;
  font-size: 17px;
  font-weight: bold;
  margin: 12px 0;
}

.card .buyBtn {
  background: #7954f6;
  color: white;
  padding: 11px;
  width: 100%;
  border-radius: 7px;
}

.card .favoriteBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 7px;
  border-radius: 50%;
  background: #f1effa;
  color: #7954f6;
}

.favoriteBtn.selected {
  color: #ef426f;
}

.banner {
  background: #171522;
  color: white;
  padding: 45px;
  border-radius: 12px;
}

.banner p {
  color: #aaa;
}

.brands {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

.brands span {
  border: 1px solid #eee;
  padding: 20px 5px;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
}

footer {
  background: #f8f7fb;
  text-align: center;
  padding: 40px;
  margin-top: 40px;
}

/* МОДАЛЬНІ ВІКНА */

.modal {
  position: fixed;
  inset: 0;
  background: #17152299;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.modal[hidden] {
  display: none;
}

.modalBox {
  background: white;
  width: min(450px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 25px;
  border-radius: 14px;
  position: relative;
}

.closeBtn {
  float: right;
  background: #f0edff;
  color: #7954f6;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 15px;
}

.modalBox h2 {
  clear: both;
}

.modalBox form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.modalBox input {
  width: 100%;
  border: 1px solid #ddd;
  padding: 13px;
  border-radius: 7px;
}

.cartItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 13px 0;
  border-bottom: 1px solid #eee;
}

.cartItem button {
  background: #f0edff;
  color: #7954f6;
  padding: 7px 10px;
  border-radius: 5px;
}

.cartControls {
  display: flex;
  align-items: center;
  gap: 6px;
}

#cartTotal {
  margin-top: 20px;
  color: #7954f6;
}

#userProfile {
  margin-top: 20px;
}

#userProfile button {
  background: #ef426f;
  color: white;
  padding: 11px;
  border-radius: 7px;
  margin-top: 12px;
}

/* КОНСУЛЬТАНТ */

.consultantBtn {
  position: fixed;
  right: 22px;
  bottom: 22px;
  padding: 16px 20px;
  background: #7954f6;
  color: white;
  border-radius: 30px;
  z-index: 200;
  box-shadow: 0 5px 20px #7954f655;
}

.chatWindow {
  position: fixed;
  right: 22px;
  bottom: 85px;
  width: min(350px, calc(100% - 30px));
  height: 430px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px 35px #17152235;
  z-index: 200;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chatWindow[hidden] {
  display: none;
}

.chatHeader {
  background: #7954f6;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.chatHeader button {
  background: transparent;
  color: white;
}

.chatMessages {
  flex: 1;
  padding: 13px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.botMessage,
.userMessage {
  padding: 11px;
  border-radius: 12px;
  max-width: 85%;
  font-size: 13px;
  line-height: 1.5;
}

.botMessage {
  align-self: flex-start;
  background: #f0edff;
}

.userMessage {
  align-self: flex-end;
  color: white;
  background: #7954f6;
}

#chatForm {
  display: flex;
  border-top: 1px solid #eee;
  padding: 10px;
  gap: 7px;
}

#chatInput {
  flex: 1;
  min-width: 0;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 7px;
}

#chatForm button {
  background: #7954f6;
  color: white;
  padding: 10px 14px;
  border-radius: 7px;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 25px;
  transform: translate(-50%, 20px);
  background: #171522;
  color: white;
  padding: 13px 20px;
  border-radius: 9px;
  opacity: 0;
  transition: .3s;
  z-index: 500;
  pointer-events: none;
  text-align: center;
}

.toast.show {
  opacity: 1;
  transform: translate(-50%, 0);
}

@media(max-width: 800px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
  }

  .brands {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media(max-width: 600px) {
  .header {
    justify-content: center;
  }

  nav {
    width: 100%;
    justify-content: center;
  }

  .header input {
    width: 100%;
  }

  .hero {
    flex-direction: column;
    padding: 25px;
  }

  .hero h1 {
    font-size: 34px;
  }

  .hero img {
    width: 100%;
  }

  .products {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .card img {
    height: 125px;
  }

  .brands {
    grid-template-columns: repeat(2, 1fr);
  }

  .consultantBtn {
    right: 12px;
    bottom: 12px;
  }

  .chatWindow {
    right: 10px;
    bottom: 75px;
  }
}

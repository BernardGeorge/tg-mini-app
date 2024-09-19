import { useState, useEffect } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
const { getData } = require("./db/db");
const foods = getData();

const tele = window.Telegram.WebApp;


function App() {
  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
    alert("tele:")
    const data = tele.initData;
    alert("data:" + data)
    const params = new URLSearchParams(window.location.search);
    
    const inivte = params.get('tgWebAppStartParam');
    alert("inivte:" + inivte)

    const app_inivte = params.get('startapp');
    alert("app inivte:" + app_inivte)
    // const user_id = tele.initDataUnsafe?.user.id;
    const handlePost = async () => {
        try {
          const response = await fetch('https://fair-views-marry.loca.lt/checkData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: "george"
            }),
            headers: {
                'Content-Type': 'application/json', // 请求体格式
                'X-Signature': '57396f4c56b448bf6d90764d4c51ae6f549ca40c0a7d2ae1fb7e6787ba266095' // 如果需要授权
            },
          });

          if (!response.ok) { // 检查状态码是否为 2xx
            const errorData = await response.json();
            alert(errorData.message || "An unknown error occurred.");
          }

          const jsonData = await response.json();
          console.log(jsonData);
        } catch (error) {
          console.error("Fetch Error:", error.message);
          alert("ERROR!!!!");
          alert(error.message);
        }
      };
    handlePost();
    // alert(params.get('tgWebAppStartParam'));
    // alert(tele.initDataUnsafe?.user.id);
    // tele.ready();
}, []);

  const onAdd = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }]);
    }
  };

  const onRemove = (food) => {
    const exist = cartItems.find((x) => x.id === food.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const onCheckout = () => {
    tele.MainButton.text = "Pay :)";
    tele.MainButton.show();
  };

  return (
    <>
      <h1 className="heading">Order Food</h1>
      {/* <h1 className="heading">{{startParam}}</h1>
      <h1 className="heading">{{startAppParam}}</h1> */}
      <Cart cartItems={cartItems} onCheckout={onCheckout}/>
      <div className="cards__container">
        {foods.map((food) => {
          return (
            <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
          );
        })}
      </div>
    </>
  );
}

export default App;

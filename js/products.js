/* let category=["bó hoa tươi","hoa khai trương", "hoa tang lễ","Giỏ hoa","hoa chúc mừng","hoa tình yêu","hoa sinh nhật"]

let products= [
    {
        id: Date.now() * Math.random(),
        name:"Bó hoa sinh nhật 551",
        category: [category[0],category[6],],
        price: "550000",
        quantity:1,
        image: "../images/bó hoa sinh nhật.jpg",
    },
    {
        id: Date.now() * Math.random(),
        name:"Bó hoa sinh nhật 400",
        category: [category[0],category[6],],
        price: "580000",
        quantity:1,
        image: "../images/bó hoa sinh nhật 400.jpg",
    },{
        id: Date.now() * Math.random(),
        name:"Bó hoa sinh nhật 200",
        category: [category[0],category[6],],
        price: "500000",
        quantity:1,
        image: "../images/bó hoa sinh nhật 200.jpg",
    },{
        id: Date.now() * Math.random(),
        name:"Hoa khai trương 032",
        category: [category[1]],
        price: "950000",
        quantity:1,
        image: "../images/hoakhaitruong112.jpg",
    },{
        id: Date.now() * Math.random(),
        name:"Hoa khai trương 1201",
        category: [category[1]],
        price: "1200000",
        quantity:1,
        image: "../images/hoachucmung1201.jpg",
    },{
        id: Date.now() * Math.random(),
        name:"Hộp hoa 1991",
        category: [category[3],category[5],],
        price: "450000",
        quantity:1,
        image: "../images/hophoa1991.jpg",
    }
    ,{
        id: Date.now() * Math.random(),
        name:"Hộp hoa 007",
        category: [category[3],category[5],],
        price: "540000",
        quantity:1,
        image: "../images/hophoa007.jpg",
    },{
        id: Date.now() * Math.random(),
        name:"Hoa tình yêu 4151",
        category: [category[3],category[5],],
        price: "450000",
        quantity:1,
        image: "../images/hoatinhyeu-4151.jpg",
    }
    ,{
        id: Date.now() * Math.random(),
        name:"Hoa chia buồn",
        category: [category[2],],
        price: "1100000",
        quantity:1,
        image: "../images/hoachiabuon600.jpg",
    }
]
localStorage.setItem("products", JSON.stringify(products)) */
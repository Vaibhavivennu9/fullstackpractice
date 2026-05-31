const express=require('express');
const bodyParser=require('body-parser');
const app=express();
let books=[
    {
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
];
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.render('index',{books:books});
});
app.post("/",(req,res)=>{
    const newboook={
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookPages: req.body.bookPages,
        bookPrice: req.body.bookPrice,
        bookState: "Available"
    };
    books.push(newbook);
    res.render('index',{books:books});
});
app.post("/issue",(req,res)=>{
    const requestedBookName=req.body.bookName;
    books.forEach(book=>{
        if (book.bookName === requestedBookName) {
            book.bookState = "Issued";
        }
    });
    res.render('index',{books:books});
});
app.post("/return",(req,res)=>{
    const requestedBookName=req.body.bookName;
    books.forEach(book=>{
        if (book.bookName === requestedBookName) {
            book.bookState = "Available";
        }
    });
    res.render('index',{books:books});
});
app.post("/delete",(req,res)=>{
    const requestedBookName=req.body.bookName;
    books=books.filter(book=>book.bookName!==requestedBookName);
    res.render('index',{books:books});
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const mongoose=require('mongoose');
const User= require('./mongg'); 
const session = require('express-session')
const methodOverride = require('method-override')
const qrcode = require('qrcode');
const fs = require('fs');
const generateQRCode = require('./qrgen');
const nodemailer = require('nodemailer');
const sendEmailWithQRCode =require('./sendmail');
const CsvParser=require('json2csv').Parser;
const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)


// credential
// const users=[]
const users = [
  {
    id: 1699953503498,
    name: 'Admin',
    email: 'admin@sode-edu.in',
    password: '$2b$10$cDqkDksa902qNdiMX1a9l./m6izoKsHldVE8wFAyq3ho17TkuVZZu', //sode-edu
    
  }
]

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// root
app.get('/',  (req, res) => {
  // res.render('index.ejs', { name: req.user.name })
  // res.render('home.ejs' ,{submsg:''})
  // const message = req.query.msg || '';
  // res.render('home.ejs', { message: message });

  const message = req.session.message || '';
  // const qrCodeFilename = req.session.qrCodeFilename || ''; 
  req.session.message = ''; // Clear the session message after displaying it
   // Retrieve from session
  res.render('home.ejs', {  message:message});


  // const message = req.session.message || '';
  // req.session.message = ''; // Clear the session message after displaying it
  // const qrCodeFilename = filePath || '';
  // res.render('home.ejs', { message: message,qrCodeFilename: qrCodeFilename });
})

app.post('/check', async (req, res) => {
  const scannedQRCodeData = req.body.qrdata;
  try {
      // Check if the scanned QR code exists in the database
      const result = await User.findOne({ uid: scannedQRCodeData });

      if (result) {
          // Match found
          res.json({ success: true, message: 'QR Code is valid.' });
      } else {
          // No match found
          res.json({ success: false, message: 'QR Code is not valid.' });
      }
  } catch (error) {
      console.error('Error checking QR Code in MongoDB:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/admin',checkAuthenticated, async(req, res) => {
  if (req.isAuthenticated()) {
    // If authenticated, redirect to the desired page
    res.render('index.ejs');

   }
   else {
    // If not authenticated, redirect to the login page
    res.redirect('/login');
  }
});


// app.get('/home',checkNotAuthenticated,(req, res) => {
//   const message = req.session.message || '';
//   // const qrCodeFilename = req.session.qrCodeFilename || ''; 
//   req.session.message = ''; // Clear the session message after displaying it
//    // Retrieve from session
//   res.render('home.ejs', {  message:message});
//   // res.render('home.ejs')
// })

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})
app.get('/admin',checkAuthenticated, (req, res) => {
  res.render('index.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: true
}))


// register pages:-->
// app.get('/register', checkNotAuthenticated, (req, res) => {
//   res.render('register.ejs')
// })

// app.post('/register', checkNotAuthenticated, async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword
//     })
//     console.log(users)
//     res.redirect('/login')
//   } catch {
//     res.redirect('/register')
//   }
// })
// ends register page.. --->
app.delete('/logout', (req, res) => {
  // req.logOut()
  req.logout((err)=>{
    if(err){
      console.log(err)
    }
    else{
      res.redirect('/login')
    }
  })

})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/admin');

  }
  next()
}

// db

app.post('/submit',async(req,res)=>{
  const uinid = new Date().getTime().toString();
  const filePath = await generateQRCode(uinid, 'png');
  const {name,usn,phone,email}=req.body;
  const phoneNumber = parseInt(phone);
  console.log(name,usn,phoneNumber ,email);
  const newuser = new User({
    name: name,
    usn: usn,
    phone: phoneNumber,
    email: email,
    uid: uinid,
    attendence:''
   
})

  newuser.save()
.then(savedUser => {
  console.log("----->",filePath)
  sendEmailWithQRCode(email, filePath);
  // console.log('User saved successfully:', savedUser);
  req.session.message = 'Your Data Saved';
  req.session.qrCodeFilename = filePath;
  // qrCodeFilename: filePath
  res.redirect('/');
  
})
.catch(error => {
  console.error('Error saving user:', error);
  // Handle errors
});

})



app.get('/submitAttendance', async (req, res) => {
  const numberToCheck = decodeURIComponent(req.query.number);

  const uu = await User.find({ uid: numberToCheck })

  if (uu && uu.length > 0) {
    res.json({
      matchFound: true,
      user: uu,
      message: 'Attendance submitted successfully!'
    });

  //  console.log(uu[0].uid);
  let gg=uu[0].uid;
try{

  const result = await User.updateOne({uid:gg},{
    $set:{
      attendence:"YES"
    }
  })
}catch(eer){
  console.log(eer);
}


  } else {
    res.json({
      matchFound: false,
      message: 'Incorrect details. Please try again.'
    });
  }

});

app.get('/downloaddata',async(req,res)=>{
try {
  let userarray = [];

  // Use await to ensure that the user data is retrieved before processing
  let userda = await User.find({});

  userda.forEach((u) => {
    const { name, usn, phone, email, uid } = u; // Corrected this line
    userarray.push({ name, usn, phone, email, uid, ATTENDENCE: 'present' }); // Assuming ATTENDENCE should be part of each user's data
  });

  const csvfield = ['name', 'usn', 'phone', 'email', 'uid', 'ATTENDENCE']; // Corrected the field names
  const csvParser = new CsvParser({ csvfield });
  const csvdata = csvParser.parse(userarray);

  res.setHeader('Content-Type', 'text/csv'); // Corrected the content type
  res.setHeader('Content-Disposition', 'attachment; filename=usersData.csv'); // Corrected the header name

  res.status(200).end(csvdata);
} catch (error) {
  console.log(error)
}


})

app.get('/table', async (req, res) => {
  
  const uu = await User.find({})

  if (uu && uu.length > 0) {
    res.json({
      matchFound: true,
      user: uu,
      message: 'Attendance submitted successfully!'
    });



  } else {
    res.json({
      matchFound: false,
      message: 'Incorrect details. Please try again.'
    });
  }

});


app.listen(3000,()=>{
  console.log(`http:localhost:3000`)
})
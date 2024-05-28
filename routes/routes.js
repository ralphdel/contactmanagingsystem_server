import express from 'express'
import { Signup, Login, Auth } from '../controllers/userController.js'
import { body } from 'express-validator'
import { VerifyUser } from '../middleware/VerifyUser.js'
import { createContact, getContacts, getContact, updateContact, deleteContact } from '../controllers/Contactcontroller.js'


const router=express.Router()



// Signup http://localhost:5000/contactms/signup
router.post('/signup',[
  body('name').trim().notEmpty().withMessage('Name Should Not be Empty'),
  body('email').trim().notEmpty().withMessage('Email Sould Not be Empty')
  .isEmail().withMessage('Invalid Email !!!'),
  body('password').trim().notEmpty().withMessage('Password Should Not be Empty')
  .isLength({min:8, max:50}).withMessage('Password Length should be between 8-50')
], Signup )


// Signup http://localhost:5000/contactms/login
router.post('/login',[
  body('email').trim().notEmpty().withMessage('Email Sould Not be Empty')
  .isEmail().withMessage('Invalid Email !!!'),
  body('password').trim().notEmpty().withMessage('Password Should Not be Empty')
  .isLength({min:8, max:50}).withMessage('Password Length should be between 8-50')
],  Login)

//Verification: "http://localhost:5000/contactms/verify"
router.get('/verify', VerifyUser, Auth)


/*CONTACT ROUTES*/
//Addcontact: http://localhost:5000/contactms/add-contact
router.post('/add-contact', VerifyUser, createContact)
 
//View contacts: http://localhost:5000/contactms/contacts
router.get('/contacts', VerifyUser,getContacts )


//view a particular contact by id: http://localhost:5000/contactms/edit-contact/:id,
router.get('/contact/:id', VerifyUser,getContact )

// Update a particularby id: http://localhost:5000/contactms/update-contact/:id
router.put('/update-contact/:id', VerifyUser, updateContact)

// Delete contact by id : http://localhost:5000/contactms/contact/${id}
router.delete('/contact/:id', VerifyUser, deleteContact)

export {router as Router}


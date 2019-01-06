const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('express').Router();
const CompanyForm =  mongoose.model('companyForms');
const OfficeForm = mongoose.model('officeForms');

// Define URL parameters
// Params for each company form
router.param('companyId', function(req, res, next, companyId) {
  CompanyForm.findOne({ companyId: companyId})
    .then(function (companyId) {
      if (!companyId) { return res.sendStatus(404); }

      req.companyId = companyId;

      return next();
    }).catch(next);
});

// Params for each office form
router.param('officeId', function(req, res, next, officeId) {
  OfficeForm.findOne({ officeId: officeId})
    .then(function (officeId) {
      if (!officeId) { return res.sendStatus(404); }

      req.officeId = officeId;

      return next();
    }).catch(next);
});

//COMPANY FORM POST METHOD
router.post('/company', (req, res, next) => {
  const { body } = req;
  console.log(req.body);
  if(!body.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }

  if(!body.address) {
    return res.status(422).json({
      errors: {
        address: 'is required',
      },
    });
  }

  if(!body.revenue) {
    return res.status(422).json({
      errors: {
        revenue: 'is required',
      },
    });
  }

  if(!body.phoneCode) {
    return res.status(422).json({
      errors: {
        phoneCode: 'is required',
      },
    });
  }

  if(!body.phoneNumber) {
    return res.status(422).json({
      errors: {
        phoneNumber: 'is required',
      },
    });
  }
  
  const finalForm = new CompanyForm(body);
  return finalForm.save()
    .then(() => res.json({ CompanyForm: finalForm.toJSON() }))
    .catch(next);
});

//OFFICE FORM POST METHOD
//User must create a company first to create an office
router.post('/company/:companyId/office', (req, res, next) => {
    const { body } = req;
  
    if(!body.name) {
      return res.status(422).json({
        errors: {
          name: 'is required',
        },
      });
    }
  
    if(!body.latitude) {
      return res.status(422).json({
        errors: {
          latitude: 'is required',
        },
      });
    }
  
    if(!body.longitude) {
      return res.status(422).json({
        errors: {
          longitude: 'is required',
        },
      });
    }
  
    if(!body.startDate) {
      return res.status(422).json({
        errors: {
          startDate: 'is required',
        },
      });
    }
    const finalForm = new OfficeForm(body);
    return finalForm.save()
      .then(() => res.json({ Officeform: finalForm.toJSON() }))
      .catch(next);
  });

//GET ALL METHOD
// get all company
router.get('/company', (req, res, next) => {
  return CompanyForm.find()
    .then((form) => res.json({ CompanyForm: form.map(form => form.toJSON()) }))
    .catch(next);
});

// get all office in a company
router.get('/company/:companyId/office', (req, res, next) => {
  const companyId = req.params.companyId
    return OfficeForm.find({companyId})
      .then((form) => res.json({ Officeform: form.map(form => form.toJSON()) }))
      .catch(next);
  });

//GET CURRENT METHOD
//get spesific company
router.get('/company/:companyId', (req, res, next) => {
  return res.json({
    companyForm: req.companyId.toJSON(),
    
  });
});

//get spesific company office
router.get('/company/:companyId/office/:officeId', (req, res, next) => {
  return res.json({
    officeForm: req.officeId.toJSON(),
  });
});


//UPDATE DATA METHOD
//Update data for company
router.patch('/company/:companyId', (req, res, next) => {
  const { body } = req;

  if(typeof body.companyId !== 'undefined') {
    req.companyForm.companyId = body.companyId;
  }

  if(typeof body.name !== 'undefined') {
    req.companyForm.name = body.name;
  }

  if(typeof body.address !== 'undefined') {
    req.companyForm.address = body.address;
  }

  if(typeof body.revenue !== 'undefined') {
    req.companyForm.body = body.revenue;
  }

  if(typeof body.phoneCode !== 'undefined') {
    req.companyForm.body = body.phoneCode;
  }

  if(typeof body.phoneNumber !== 'undefined') {
    req.companyForm.body = body.phoneNumber;
  }

  return req.companyForm.save()
    .then(() => res.json({ companyForm: req.companyForm.toJSON() }))
    .catch(next);
});

//Update data for a company office
router.patch('/company/:companyId/office/:officeId', (req, res, next) => {
  const { body } = req;

  if(typeof body.name !== 'undefined') {
    req.officeForm.name = body.name;
  }

  if(typeof body.latitude !== 'undefined') {
    req.oficeForm.latitude = body.latitude;
  }

  if(typeof body.longitude !== 'undefined') {
    req.officeForm.body = body.longitude;
  }

  if(typeof body.startDate !== 'undefined') {
    req.officeForm.body = body.startDate;
  }

  return req.companyForm.save()
    .then(() => res.json({ companyForm: req.companyForm.toJSON() }))
    .catch(next);
});


//DELETE DATA METHOD
// delete a company also all their office


router.delete('/company/:companyId', (req, res, next) => {
  return CompanyForm.findOneAndRemove(req.params.companyId)
    .then(() => res.sendStatus(200))
    .catch(next);
});

// delete a company office
router.delete('/company/:companyId/office/:officeId', (req, res, next) => {
  console.log('ets');
  return OfficeForm.findOneAndRemove(req.params.officeId)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;
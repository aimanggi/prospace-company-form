const mongoose = require('mongoose');
const { Schema } = mongoose;

//Create model for input a new company
const CreateCompany = new Schema({
  companyId: {type: String, lowercase: true, unique: true},
  name: String,
  address: String,
  revenue: Number,
  phoneCode: Number,
  phoneNumber: Number
});

CreateCompany.methods.toJSON = function() {
  return {
    companyId: this.companyId,
    name: this.name,
    address: this.address,
    revenue: this.revenue,
    phoneCode: this.phoneCode,
    phoneNumber: this.phoneNumber
  };
};

//Create model for input a new company office
const CreateOffice = new Schema({
    companyId: String,
    officeId: {type: String, lowercase: true, unique: false},
    name: String,
    latitude: Number,
    longitude: Number,
    startDate: String 
  });
  
  CreateOffice.methods.toJSON = function() {
    return {
      companyId: this.companyId,
      officeId: this.officeId,
      name: this.name,
      latitude: this.latitude,
      longitude: this.longitude,
      startDate: this.startDate
    };
  };

mongoose.model('companyForms', CreateCompany);
mongoose.model('officeForms', CreateOffice);


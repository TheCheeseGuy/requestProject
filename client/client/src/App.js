import React from 'react'
import { Formik, Field, Form, ErrorMessage, getIn } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import logo from './lcslogo1.png'

function App() {
  const initialValues = {
    nameOfSponsor: '',
    numberOfGuest: 0,
    descriptionOfEvent: "",
    eventTiming: {
      eventDate: "",
      startsAt: "",
      endsAt: "",
      setupTime: "",
      takedownTime: "",
    },
    foodBeverage: "",
    facilityDetails: [],
    facilityDept: {
      lectern: 0,
      chairs: 0,
      tables: 0,
      utensils: 0,
      coffee: 0,
      coffeeUrns: 0,
      bottledCups: 0,
      paperPlate: 0,
      tea: 0,
      paperCups: 0,
      tableCloth: 0,
      piano: 0,
      banners: 0,
      lighting: 0,
      hotWater: 0
    },
    itDept: {
      speakers: 0,
      soundSystem: 0,
      drone: 0,
      screen: 0,
      camera: 0,
      projector: 0,
      microphone: 0,
      extension: 0
    },
    personResponsible: ''
  }

  const validateSchema = Yup.object().shape({
    nameOfSponsor: Yup.string().required('Name of Sponsor is required'),
    numberOfGuest: Yup.number().min(1).required("Number of guest is required"),
    descriptionOfEvent: Yup.string().required("Please enter a description"),
    eventTiming: Yup.object().shape({
      eventDate: Yup.string().required('Please choose a date'),
      startsAt: Yup.string().required('Please chose a start time'),
      endsAt: Yup.string().required('Please choose an end time'),
      setupTime: Yup.string().required("Please choose a setup time"),
      takedownTime: Yup.string().required("Please choose a takedown time")
    }),
    foodBeverage: Yup.string().required('Please choose'),
    facilityDetails: Yup.array().of(Yup.string()).required('Please choose a facility'),
    facilityDept: Yup.object().shape({
      lectern: Yup.number(),
      chairs: Yup.number(),
      tables: Yup.number(),
      utensils: Yup.number(),
      coffeeUrns: Yup.number(),
      bottledCups: Yup.number(),
      paperPlate: Yup.number(),
      tea: Yup.number(),
      paperCups: Yup.number(),
      tableCloth: Yup.number(),
      piano: Yup.number(),
      banners: Yup.number(),
      lighting: Yup.number(),
      hotWater: Yup.number(),
      coffee: Yup.number()
    }),
    itDept: Yup.object().shape({
      speakers: Yup.number(),
      soundSystem: Yup.number(),
      drone: Yup.number(),
      screen: Yup.number(),
      camera: Yup.number(),
      projector: Yup.number(),
      microphone: Yup.number(),
      extension: Yup.number(),
    }),
    personResponsible: Yup.string().required('Please enter person responsible')
  })

  async function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus()
    var config = {
      method: 'post',
      url: 'http://localhost:4000/api/request',
      headers: {
        'Content-Type': 'application/json'
      },
      data: fields
    };
    try {
      const { data } = await axios(config)
      // put the return function that will return a jsx like a thank you page 
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="container" style={{ width: "600px 0", flexDirection: "row" }} >
          <div className='container mt-3 row'>
            <div className='container col-4'>
              <img src={logo} alt='logo' className='img-thumbnail' style={{ width: 300 }} />
            </div>
            <div className='col-8 d-flex flex-row-reverse'>
              <div className='d-flex text-buttom flex-column'>
                <div className='p-2'></div>
                <div className='p-2'></div>
                <div ><p className='display-5 fw-bold' style={{ font: "poppins" }}>Event Request Form </p></div>
              </div>

            </div>
          </div>
        </div>
        <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className='container' style={{ width: "600px 0" }}>
                <div className="accordion p-3 gap-3" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item p-3">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        <p className="lead fw-bold">Event Details</p>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                      <div className=" mt-2 row g-3">
                        <div className="col-md">
                          <div className="form-floating">
                            <Field name="nameOfSponsor" type="text" className={"form-control" + (errors.nameOfSponsor && touched.nameOfSponsor ? ' is-invalid' : "")} id="floatingInputGrid" placeholder="Name of sponsor" />
                            <label htmlFor="floatingInputGrid">Name of Sponsor</label>
                            <ErrorMessage name="nameOfSponsor" component='div' className="invalid-feeback" />
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="form-floating">
                            <Field name="numberOfGuest" type="text" className={"form-control" + (errors.numberOfGuest && touched.numberOfGuest ? ' is-invalid' : "")} id="floatingInputGrid" placeholder="Number of Guests" />
                            <label htmlFor="floatingInputGrid">Number of Guest</label>
                            <ErrorMessage name="numberOFGuest" component='div' className="invalid-feeback" />
                          </div>
                        </div>
                      </div>
                      <div className="form-floating mt-3 g-3">
                        <Field name="descriptionOfEvent" className={"form-control" + (errors.descriptionOfEvent && touched.descriptionOfEvent ? ' is-invalid' : "")} placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} />
                        <label htmlFor="floatingTextarea2">Description and Purpose of Event</label>
                        <ErrorMessage name="descriptionOfEvent" component='div' className="invalid-feeback" />
                      </div>
                      <div className="row mt-3">
                        <div className="col-md">
                          <div className="form-floating mt-3">
                            <Field name="eventTiming.eventDate" type="date" className={"form-control" + (getIn(errors, 'eventTiming.eventDate') && getIn(touched, 'eventTiming.eventDate') ? ' is-invalid' : "")} id="floatingInoutGrid" placeholder="Event time" />
                            <label htmlFor="floadtingInputGrid"> Event Date</label>
                            <ErrorMessage name="eventTiming.eventDate" component='div' className="invalid-feedback" />
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="form-floating mt-3">
                            <Field name="eventTiming.startsAt" type="time" className={"form-control" + (getIn(errors, 'eventTiming.startsAt') && getIn(touched, 'eventTiming.startsAt') ? ' is-invalid' : '')} id="floatingInoutGrid" placeholder="Event time" />
                            <label htmlFor="floadtingInputGrid"> Starts at</label>
                            <ErrorMessage name="eventTiming.startsAt" component='div' className="invalid-feeback" />
                          </div>
                        </div>
                        <div className='col-md'>
                          <div className="form-floating mt-3">
                            <Field name="eventTiming.endsAt" type="time" className={"form-control" + (getIn(errors, 'eventTiming.endsAt') && getIn(touched, 'eventTiming.endsAt') ? ' is-invalid' : "")} id="floatingInoutGrid" placeholder="Event time" />
                            <label htmlFor="floadtingInputGrid"> Ends at</label>
                            <ErrorMessage name="eventTiming.endsAt" component='div' className="invalid-feeback" />
                          </div>
                        </div>
                      </div>
                      <div className='row g-3'>
                        <div className='col-md'>
                          <div className="form-floating mt-3">
                            <Field name="eventTiming.setupTime" type="time" className={"form-control" + (getIn(errors, 'eventTiming.setupTime') && getIn(touched, 'eventTiming.setupTime') ? ' is-invalid' : "")} id="floatingInoutGrid" placeholder="Event time" />
                            <label htmlFor="floadtingInputGrid"> SetUp Time</label>
                            <ErrorMessage name='eventTIming.setupTime' component='div' className='invalid-feedback' />
                          </div>
                        </div>
                        <div className='col-md'>
                          <div className="form-floating mt-3">
                            <Field name='eventTiming.takedownTime' type="time" className={"form-control" + (getIn(errors, 'eventTiming.takedownTime') && getIn(touched, 'eventTiming.takedownTime') ? ' is-invalid' : "")} id="floatingInoutGrid" placeholder="Event time" />
                            <label htmlFor="floadtingInputGrid"> Take Down Time</label>
                            <ErrorMessage name='eventTiming.takedownTime' component="div" className='invalid-feedback' />
                          </div>
                        </div>
                      </div>
                      <div className='row mt-3'>
                        <div className="col-6">
                          <div className="form-floating">
                            <Field name="personResponsible" type="text" className={"form-control" + (errors.personResponsible && touched.personResponsible ? ' is-invalid' : "")} id="floatingInputGrid" placeholder="Name of sponsor" />
                            <label htmlFor="floatingInputGrid">Person Responsible</label>
                            <ErrorMessage name="personResponsible" component='div' className="invalid-feeback" />
                          </div>
                        </div>
                        <div className='col-4'>
                          <span>Will food / beverages be served ?</span>
                          <div className="form-check">
                            <Field className="form-check-input" type="radio" name="foodBeverage" value="yes" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                              Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <Field className="form-check-input" type="radio" name="foodBeverage" value="no" id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion p-3" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        <p className='lead fw-bold'> Facility Details </p>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                      <div className="accordion-body">
                        <div className="container-lg justify-itmes-center">
                          <div className="row">
                            <div className="form-check col-md">
                              <Field name="facilityDetails" value="Multi Purpose Hall" className="form-check-input" type="checkbox" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Multi Purpose Hall
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Lincoln Field" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Lincoln Field
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Swimming Pool" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Swimming Pool
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Anglican Church Field" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Anglican Church Field
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Outdoor BasketBall Court" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Outdoor BasketBall Court
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="VPAC" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                VPAC
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="NPAT" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                NPAT
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Computer Hall" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Computer Hall
                              </label>
                            </div>
                          </div>
                          < div className="row">
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="science lab" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Science Lab <sup>*</sup>
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Conference room" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Conference Room <sup>*</sup>
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Classroom" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Classroom <sup>*</sup>
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Junior School Library" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Junior School Library
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="World Language Center" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                World Language Center
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Senior School Library" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Senior School Library
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Under the Arches" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Under the Arches
                              </label>
                            </div>
                            <div className="form-check col-md">
                              <Field name="facilityDetails" className="form-check-input" type="checkbox" value="Multi Purpose Hall(Akyede)" id="flexCheckDefault" />
                              <label className="form-check-label" htmlFor="flexCheckDefault">
                                Multi Purpose Hall (Akyede)
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion p-3" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        <p className="lead fw-bold">Facility Department</p>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                      <div className="accordion-body">
                        <div className='container-lg mb-3 row'>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Lectern</span>
                              <Field name="facilityDept.lectern" type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Chairs</span>
                              <Field name="facilityDept.chairs" type="tel" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />

                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Tables</span>
                              <Field name='facilityDept.tables' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />

                            </div>
                          </div>
                        </div>
                        <div className='container-lg  mb-3 row'>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Utensils</span>
                              <Field name='facilityDept.utensils' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />

                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Coffee Urns</span>
                              <Field name='facilityDept.coffeeUrns' type="tel" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Coffee</span>
                              <Field name='facilityDept.coffee' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                        </div>
                        <div className='container-lg mb-3 row'>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Bottled Cups</span>
                              <Field name='facilityDept.bottledCups' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Paper Plate</span>
                              <Field name='facilityDept.paperPlate' type="tel" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Tea</span>
                              <Field name='facilityDept.tea' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                        </div>
                        <div className='container-lg mb-3 row'>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Paper Cups</span>
                              <Field name='facilityDept.paperCups' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Table Cloth</span>
                              <Field name='facilityDept.tableCloth' type="tel" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Piano</span>
                              <Field name='facilityDept.piano' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                        </div>
                        <div className='container-lg mb-3 row'>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Banners</span>
                              <Field name='facilityDept.banners' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Lighting</span>
                              <Field name='facilityDept.lighting' type="tel" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                          <div className='col-md'>
                            <div className="input-group">
                              <span className="input-group-text" id="basic-addon2">Hot Water</span>
                              <Field name='facilityDept.hotWater' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion p-3" id="accordionPanelsStayOpenExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                        <p className="lead fw-bold">IT Department </p>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                      <div className="accordion-body">
                        <div className="container-lg">
                          <div className='container-lg mb-3 row'>
                            <div className='col-md'>
                              <div className="input-group">
                                <span className="input-group-text" id="basic-addon2">Speakers</span>
                                <Field name='itDept.speakers' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />

                              </div>
                            </div>
                            <div className='col-md'>
                              <div className="input-group">
                                <span className="input-group-text" id="basic-addon2">Sound System</span>
                                <Field name='itDept.soundSystem' type="tel" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                              </div>
                            </div>
                            <div className='col-md'>
                              <div className="input-group">
                                <span className="input-group-text" id="basic-addon2">Drone</span>
                                <Field name='itDept.drone' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                              </div>
                            </div>
                          </div>
                          <div className='container-lg  mb-3 row'>
                            <div className='col-md'>
                              <div className="input-group">
                                <span className="input-group-text" id="basic-addon2">Screen</span>
                                <Field name='itDept.screen' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                              </div>
                            </div>
                            <div className='col-md'>
                              <div className="input-group">
                                <span className="input-group-text" id="basic-addon2">Camera</span>
                                <Field name='itDept.camera' type="tel" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                              </div>
                            </div>
                            <div className='col-md'>
                              <div className="input-group">
                                <span className="input-group-text" id="basic-addon2">Projector</span>
                                <Field name='itDept.projector' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                              </div>
                            </div>
                          </div>
                          <div className='container-lg mb-3 row'>
                            <div className='col-md'>
                              <div className="input-group">
                                <span className="input-group-text" id="basic-addon2">Microphone</span>
                                <Field name='itDept.microphone' type="tel" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                              </div>
                            </div>
                            <div className='col-md'>
                              <div className="input-group">
                                <span className="input-group-text" id="basic-addon2">Extension</span>
                                <Field name='itDept.extension' type="number" className="form-control" placeholder="Enter quantity needed" aria-label="Enter quantity needed" aria-describedby="basic-addon2" />
                              </div>
                            </div>
                          </div>
                          <p className='lead mt-2 text-muted' style={{ font: "poppiins" }}><i>
                            Contact IT Helpdesk for laptops and iPADS if needed
                          </i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container text-center">
                  <button type="submit" disabled={isSubmitting} className="btn btn-lg p-3 m-5 btn-primary">
                    {isSubmitting && <span className='spinner-border spinner-border-sm mr-1'></span>}
                    Submit</button>
                </div>
              </div>
            </Form >
          )}
        </Formik>
      </div >
    </div >
  );
}
export default App

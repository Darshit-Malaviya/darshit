import React, { Children, Component } from "react";
import logoImage from "../assets/img/logo-new.svg";
import backIcon from "../assets/img/back-icon.svg";
import tickIcon from "../assets/img/get-quote/step-completed.svg";
import HeadContact from "../assets/img/mobile_head.svg";
import HeadGetQuote from "../assets/img/get_quote_head.svg";
import HeadUser from "../assets/img/Head_User.svg";
import HeadSearch from "../assets/img/HeadSearch.svg";
import HeadMenu from "../assets/img/HeadMenu.svg";
import Step1 from "../assets/img/step-1.svg";
import Step2 from "../assets/img/step-2.svg";
import Step3 from "../assets/img/step-3.svg";
import Step4 from "../assets/img/step-4.svg";
import Envelop from "../assets/img/Envelop.svg";
import envelopActive from "../assets/img/envalope-filled.svg";
import Boxes from "../assets/img/box.svg";
import boxesActive from "../assets/img/box-filled.svg";
import Television from "../assets/img/TV.svg";
import televisionActive from "../assets/img/tv-filled.svg";
import Furniture from "../assets/img/Furniture.svg";
import furnitureActive from "../assets/img/furniture-filled.svg";
import Auto from "../assets/img/Auto.svg";
import autoActive from "../assets/img/auto-filled.svg";
import AddBtn from "../assets/img/Add-btn.svg";
import DeleteBtn from "../assets/img/delete-btn.svg";
import mobileAddBtn from "../assets/img/mobile-add.svg";
import mobileDelet from "../assets/img/mobile-delete.svg";
import mapIcon from "../assets/img/map-icon.svg";
import FormHelperText from "@material-ui/core/FormHelperText";
import cogoToast from "cogo-toast";
import { CommonConfig } from "../utils/constant";
import arrowRightWhite from "../assets/img/get-quote/arrow-right-white.svg";
import api from "../utils/apiClient";
import _, { indexOf, remove, times } from "lodash";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import SimpleBackdrop from "../utils/general";
import GetRate from "./GetRate";
import { NavLink } from "react-router-dom";

// const rateurl = "https://phpstack-773983-2649424.cloudwaysapps.com/"; //rates.sflworldwide.com/";
var stepValidate = false;
var allValid = false;

// const commonUrl = "https://phpstack-773983-3486562.cloudwaysapps.com/";
const commonUrl = "http://localhost:3000/";
// const commonUrl = "https://rates.sflworldwide.com/";

const productiourl = "https://www.sflworldwide.com/";

const bookurl = `https://hub.sflworldwide.com/auth/SalesLeadsRedirect-page/`;

const rateurl = "https://rates.sflworldwide.com/";

// const nextpageurl = "https://rates.sflworldwide.com/GetQuoteThankyou";
const nextpageurl = commonUrl + "SuccessPage";

class GetQuoteThankyouDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactvalid: false,
      FirstStep: "",
      SetMultiStep: "",
      ContactValidation: "",
      CheckZipCode: null,
      AllPackaeseArry: [],
      PackageStatusValue: "",
      BoxesStatusValue: "",
      AutoStatusValue: "",
      TelevisionStatusValue: "",
      EnvelopStatusValue: "",
      FurnitureStatusValue: "",
      getWidthvalue: null,

      AllBoxValue: null,
      AllAutoValue: null,
      AllTelevisionValue: null,
      AllPcakegesValue: null,

      allpackagesValue: [
        {
          ActualWeight: "",
          ChargeableWeight: "0",
          DimensionH: "",
          DimensionL: "",
          DimensionW: "",
          PackageType: "1",
          Quantity: "1",
          Status: "Active",
        },
      ],

      allAutoValue: [
        {
          CarMake: "",
          CarModel: "",
          CarYear: "",
          PackageType: "5",
          Status: "Active",
        },
      ],

      EnvelopValue: [
        {
          PackageType: "2",
          ActualWeight: 0.5,
          DimensionL: 10,
          DimensionW: 13,
          DimensionH: 1,
          ChargeableWeight: 1,
          Status: "Active",
          Quantity: 1,
        },
      ],

      allTelevisionValue: [
        {
          ActualWeight: "",
          ChargeableWeight: "0",
          DimensionH: "",
          DimensionL: "",
          DimensionW: "",
          Quantity: "1",
          PackageType: "4",
          Status: "Active",
          TVMake: "",
          TVModel: "",
        },
      ],
      AllfurnitureValue: [
        {
          ActualWeight: "0",
          PackageType: "3",
          Quantity: "1",
          Status: "Active",
        },
      ],

      submitList: [],

      AllRatesDetails: null,

      BoxWeightvalue: null,
      BoxDimantionLengthValue: null,
      BoxDimantionWidthValue: null,
      BoxDimantionHeightValue: null,
      TelBrandName: null,
      TelModel: null,
      TelWeight: null,
      TelDLength: null,
      TelDWeight: null,
      TelDHeight: null,
      AutoBrandName: null,
      AutoCarModel: null,
      AutoCarYear: null,

      TelBrandNameErr: "",
      TelModelErr: "",
      TelWeightErr: "",
      TelDLengthErr: "",
      TelDWeightErr: "",
      TelDHeightErr: "",
      AutoBrandNameErr: "",
      AutoCarModelErr: "",
      AutoCarYearErr: "",
      PackageDetailsErr: "",
      BoxDimantionLengthErr: "",
      BoxDimantionWidthErr: "",
      BoxDimantionHeightErr: "",

      ShipmentErr: "",
      ToStateCodeValueErr: "",
      FromFedExCityValueErr: "",
      ToZipCodeValueErr: "",

      CountryList: [],
      CountryListValue: [],
      FromFedExCityOptionValue: [],
      FromFedExCityValue: [],
      ToFedExCityOptionValue: [],
      ToFedExCityValue: [],
      SelectedOption: "",
      USSelectedOption: {
        label: "United States",
        value: 202,
      },

      SelectedOptionTo: "",
      FromSelectedCountry: {},

      FromZipCodeValue: null,
      FromZipCodeErr: "",

      ContactvalueErr: "",
      EmailvalueErr: "",
      PhoneNumbervalueErr: "",

      StepThirdtoSecond: "",
      FinaleBoxStart: "",
      EnvelopeStep4TO3: "",
      EnvelopeStep3TO1: "",

      noOfBoxinPackeges: [],

      ToSelectedCountry: {
        label: "",
        value: "",
      },
      hidefromzipcode: false,
      hidetozipcode: false,
      FromIsFedxCity: 0,
      ToIsFedxCity: 0,
      ThankyouPageMoveFromZip: false,
      ThankyouPageMoveToZip: false,
      FromCityList: [],
      FromFedExCityList: [],
      FromUPSCityList: [],
      ToCityList: [],
      ToFedExCityList: [],
      ToUPSCityList: [],
      setselcetedBox: [],
      inputs: [],
      television: [],
      auto: [],

      EnvelopStatus: null,
      LocationStatus: null,
      PackageStatus: null,
      ContactStatus: null,
      LastStatus: null,
      validationenable: false,

      WeightBoxDetailsValue: null,

      FromSelectedCity: {},
      FromFedExSelectedCity: {},
      FromUPSSelectedCity: {},
      ToFedExSelectedCity: {},
      ToUPSSelectedCity: {},
      ToSelectedCity: {},
      FromCity: "",
      ToCity: "",
      flag: 0,
      flag2: 0,
      FromState: "",
      ToState: "",

      PersonID: "",
      UserAccess: "",
      BoxesErrText: "",
      ContactName: "",
      PhoneNumber: "",
      email: "",

      FromZip: "",
      ToZip: "",
      page_redirectionPath: "",

      documentData: [],
      packagetype: "",
      SelectedPakage: [],
      checkSelectedPakage: [],
      finalPackage: [],
      televisionValue: "",
      nextStepValue: null,
      PackageStatus: null,
      previousIndex: null,
      currentIndex: null,
      rowId: null,

      NextButtonIdx: 0,
      IsResidential: 0,
      activeIndex: 0,

      showBoxDetails: false,
      showTVDetails: false,
      showCarDetails: false,
      packDetails: false,
      ShowEnvelop: false,
      Showfurniture: false,

      Loading: false,
      getRatesModule: false,
      fromStateName: "",
      toStateName: "",
      newcountryid: "",
      FromZipCode: "",
      FromZipCodeErr: false,
      FromZipCodeErrText: "",
      FromCityErr: false,
      FromCityErrText: "",
      ToCityErr: false,
      ToCityErrText: "",
      new: "",
      ToZipCode: "",
      ToZipCodeErr: false,
      ToZipCodeHelperText: "",
      TozipCodeError: "",

      tempboxDetails: [],
      boxDetails: [],
      tempTvDetails: [],
      tvDetails: [],
      tempCarDetails: [],
      carDetails: [],

      tempCountryList: [],

      finalImage: [],
      tempFinalImage: [],
      erorrmsg: "",

      packgedata: {
        no_pack: [],
        weight: [],
        len: [],
        width: [],
        height: [],
        chargableWeight: [],
        insuredValue: [],
      },
      Steps: [
        {
          stepName: Step1,
          stepId: "shipperdetails", //packagedetails
          classname: "active",
        },
        {
          stepName: Step2,
          stepId: "packagedetails", //shipmentdetails
          classname: "inactive",
        },
        {
          stepName: Step3,
          stepId: "shipmentdetails", //shipperdetails
          classname: "inactive",
        },
        {
          stepName: Step4,
          stepId: "shipsmart", //shipsmart
          classname: "inactive",
        },
      ],
    };
  }

  urlclick() {
    window.location = "https://www.sflworldwide.com/";
  }

  GetSuccessPage() {
    window.location = commonUrl + "SuccessPage";
  }

  CallGetRate() {
    window.location = commonUrl + "GetRate";
  }

  showLoader = () => {
    this.setState({ Loading: true });
  };

  hideLoader = () => {
    this.setState({ Loading: false });
  };

  async GetCountry() {
    try {
      await api
        .get("location/getCountryList")
        .then((res) => {
          if (res.success) {
            var Country = res.data;
            this.state.tempCountryList.push(res.data);
            this.setState({ CountryList: Country });
            document.getElementById("fromCountrySelect").value = 202;
            this.setState({
              newcountryid: document.getElementById("fromCountrySelect").value,
            });

            var selectedCountryList = _.filter(Country, { CountryID: 202 });

            if (selectedCountryList[0].IsZipAvailable === 0) {
              this.setState({ hidefromzipcode: false });
            } else {
              this.setState({ hidefromzipcode: true });
            }
            var SelectedCountry = {
              value: selectedCountryList[0].CountryID,
              label: selectedCountryList[0].CountryName,
            };
            this.setState({
              FromSelectedCountry: SelectedCountry,
            });
            //================== FOR TO COUNTRY =========================
            document.getElementById("toCountrySelect").value = "";
          }
        })
        .catch((err) => {
          console.log("err...", err);
        });
    } catch (error) {}
  }

  countryChange = (e, type) => {
    if (type === "from") {
      this.setState({ FromIsFedxCity: 0, FromSelectedCountry: {} });
      let CountryId = e.target.value;
      let forzip = _.findIndex(this.state.CountryList, function (country) {
        return country.CountryID == CountryId;
      });
      let zip = this.state.CountryList[forzip];
      if (zip.CountryName !== "United States" && zip.IsFedexCity === 1) {
        this.setState({ FromIsFedxCity: 1 });
        this.getCityList(zip.CountryID, "from");
      } else if (zip.CountryName === "China") {
        this.getCityList(zip.CountryID, "from");
      }
      var FromSelectedCountry = {
        value: zip.CountryID,
        label: zip.CountryName,
      };

      this.setState({ FromSelectedCountry: FromSelectedCountry });
      this.setState({ FromZip: "", FromCity: "", FromFedExSelectedCity: "" });
      document.getElementById("fromzipSelect").value = "";
    }
    if (type === "to") {
      this.setState({ ToIsFedxCity: 0, ToSelectedCountry: {} });
      let CountryId = e.target.value;
      let forzip = _.findIndex(this.state.CountryList, function (country) {
        return country.CountryID == CountryId;
      });
      let zip = this.state.CountryList[forzip];
      if (zip.CountryName !== "United States" && zip.IsFedexCity === 1) {
        this.setState({ ToIsFedxCity: 1 });
        this.getCityList(zip.CountryID, "to");
      } else if (zip.CountryName === "China") {
        this.getCityList(zip.CountryID, "to");
      } else {
        this.setState({ hidetozipcode: true });
      }
      var ToSelectedCountry = {
        value: zip.CountryID,
        label: zip.CountryName,
      };
      this.setState({ ToSelectedCountry: ToSelectedCountry });
      this.setState({ ToZip: "", ToCity: "", ToFedExSelectedCity: "" });
      // document.getElementById("TozipSelect").value = "";
    }
  };

  handleChange_Value1(type) {
    if (type === "FromFedExCity") {
      let selectedCity = this.state.FromFedExSelectedCity.value;
      if (
        selectedCity == "" ||
        selectedCity == undefined ||
        selectedCity == null
      ) {
        this.setState({
          FromCityErr: true,
          FromCityErrText: "Please select from city",
        });
      } else {
        this.setState({
          FromCityErr: false,
          FromCityErrText: "",
        });
      }
    }

    if (type === "ToFedExCity") {
      console.log("IN");
      let selectedCity = this.state.ToFedExSelectedCity.value;

      if (
        selectedCity == "" ||
        selectedCity == undefined ||
        selectedCity == null
      ) {
        this.setState({
          ToCityErr: true,
          ToCityErrText: "Please select to fedex city",
        });
      } else {
        this.setState({ ToCityErr: false, ToCityErrText: "" });
      }
    }
  }

  getCityList = (value, type) => {
    var CityData = { CityType: "FedEx", CountryId: value };
    if (type === "from") {
      api
        .post("location/getCityList", CityData)
        .then((res) => {
          if (res.success) {
            this.setState({ FromFedExCityList: res.data });
          } else {
            this.setState({ FromFedExCityList: [] });
          }
        })
        .catch((error) => {});
    } else {
      api
        .post("location/getCityList", CityData)
        .then((res) => {
          if (res.success) {
            this.setState({ ToFedExCityList: res.data });
          } else {
            this.setState({ ToFedExCityList: [] });
          }
        })
        .catch((error) => {});
    }
  };

  renderCountryOptions() {
    return this.state.CountryList.map((value) => {
      return <option value={value.CountryID}>{value.CountryName}</option>;
    });
  }

  shipperInfoChange = (event, type) => {
    if (type === "ContactName") {
      this.setState({ ContactName: event.target.value });
    } else if (type === "Number") {
      this.setState({ PhoneNumber: event.target.value });
    } else if (type === "Email") {
      this.setState({ email: event.target.value });
    }
  };

  ChangeFromZipUS = (e) => {
    var zip = e.target.value.trim().replace(/\s/g, "");
    // if (this.state.FromSelectedCountry.value === 37) {
    //   if (zip.length < 5 || /[^A-Za-z@.0-9\d]/.test(zip)) {
    //     this.setState({
    //       FromZipNotFoundErr: true,
    //       FromZipNotFoundErrText:
    //         "Please enter the zip code at list 5 character",
    //     });
    //   } else {
    //     this.setState({
    //       FromZipNotFoundErr: false,
    //       FromZipNotFoundErrText: "",
    //       FromZip: zip.trim(),
    //     });

    //   }
    //   this.setState({ FromZip: zip.trim()});
    // } else {
    let newzip = zip.trim();
    let modifyzip = newzip.replaceAll(" ", "");
    this.setState({ FromZip: modifyzip.replace(/\s/g, "") });
    if (modifyzip.length) {
      var SelectedCity = { value: null, label: null };
      this.setState({
        FromFedExSelectedCity:
          this.state.FromIsFedxCity === 1
            ? this.state.FromFedExSelectedCity.value
            : "",
        FromUPSSelectedCity: SelectedCity,
        FromSelectedCity: SelectedCity,
      });
      fetch(
        CommonConfig.zipCodeAPIKey(
          modifyzip,
          this.state.FromSelectedCountry.label
        )
      )
        .then((result) => result.json())
        .then((data) => {
          this.setState({
            CheckZipCode: data.status,
          });
          console.log("Data = ", data);
          if (data["status"] === "OK") {
            if (
              data["results"][0] &&
              data["results"][0].hasOwnProperty("postcode_localities")
            ) {
              var FinalCity = [];
              var state = "";
              var CityData = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "locality") {
                    return data.types[0] === "locality";
                  }
                }
              );

              var CityData2 = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "neighborhood") {
                    return data.types[0] === "neighborhood";
                  }
                }
              );

              var CityData3 = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "administrative_area_level_2") {
                    return data.types[0] === "administrative_area_level_2";
                  }
                }
              );

              var CityData4 = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "postal_town") {
                    return data.types[0] === "postal_town";
                  }
                }
              );

              var CityData5 = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "administrative_area_level_1") {
                    return data.types[0] === "administrative_area_level_1";
                  }
                }
              );

              if (CityData.length > 0) {
                CityData = CityData[0].long_name;
                FinalCity.push({
                  City_code: CityData,
                  Name: CityData,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              } else if (CityData2.length > 0) {
                CityData2 = CityData2[0].long_name;
                FinalCity.push({
                  City_code: CityData2,
                  Name: CityData2,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              } else if (CityData3.length > 0) {
                CityData3 = CityData3[0].long_name;
                FinalCity.push({
                  City_code: CityData3,
                  Name: CityData3,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              } else if (CityData4.length > 0) {
                CityData4 = CityData4[0].long_name;
                FinalCity.push({
                  City_code: CityData4,
                  Name: CityData4,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              } else if (CityData5.length > 0) {
                CityData5 = CityData5[0].long_name;
                FinalCity.push({
                  City_code: CityData5,
                  Name: CityData5,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              }

              this.setState({ FromCityList: FinalCity });
              let fromStatename = "";
              if (
                state == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                ).length > 0
              ) {
                state = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].short_name;

                fromStatename = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].long_name;
              }

              var SelectedCity =
                FinalCity.length > 0
                  ? {
                      value: FinalCity[0].City_code,
                      label: FinalCity[0].Name,
                    }
                  : "";

              if (this.state.FromSelectedCountry.label === "China") {
                this.setState({
                  FromState: fromStatename,
                  fromStateName: state,
                  FromFedExSelectedCity: SelectedCity,
                });
              } else {
                this.setState({
                  FromState: fromStatename,
                  FromSelectedCity: SelectedCity,
                  FromCity: SelectedCity.label,
                  fromStateName: state,
                });
              }
              if (FinalCity.length === 0) {
                this.getCityList(this.state.FromSelectedCountry.value, "from");
              }
            } else if (data["results"][0]) {
              var FinalCity = [];
              var city = "";
              var state = "";

              if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "locality";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "locality";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_3";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_3";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "political";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "political";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "neighborhood";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "neighborhood";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].long_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_2";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_2";
                  }
                )[0].long_name;
              } else if (city == "") {
                city = "";
              }
              let fromStatename = "";
              if (
                state == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                ).length > 0
              ) {
                state = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].short_name;

                fromStatename = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].long_name;
              }

              FinalCity.push({
                Citycode: city,
                CityName: city,
              });
              this.setState({
                FromCityList: [
                  {
                    City_code: FinalCity[0].Citycode,
                    Name: FinalCity[0].CityName,
                  },
                ],
                FromState: fromStatename,
                fromStateName: state,
              });

              var SelectedCity =
                FinalCity.length > 0
                  ? {
                      value: FinalCity[0].Citycode,
                      label: FinalCity[0].CityName,
                    }
                  : "";

              if (this.state.FromSelectedCountry.label === "China") {
                this.setState({
                  GetRate: GetRate,
                  FromFedExSelectedCity: SelectedCity,
                });
              } else {
                this.setState({
                  FromSelectedCity: SelectedCity,
                  GetRate: GetRate,
                  FromCity: FinalCity[0].Citycode,
                });
              }
              if (FinalCity.length === 0) {
                this.getCityList(this.state.FromSelectedCountry.value, "from");
              }
            } else {
              this.setState({ FromCityList: [] });
              var GetRate = this.state.GetRate;
              GetRate.FromCity = null;
              GetRate.FromFedExCity = null;
              GetRate.FromUPSCity = null;
              GetRate.FromState = null;
              GetRate.FromZipCode = "";
              this.setState({ GetRate: GetRate });
            }
            this.state.flag = 0;
            this.setState({
              FromZipCodeErr: false,
              FromZipCodeErrText: "",
              FromZipNotFoundErrText: "",
              ThankyouPageMoveFromZip: false,
            });
          } else {
            if (
              this.state.FromZip.length >= 4 ||
              /[^A-Za-z@.0-9\d]/.test(this.state.FromZip)
            ) {
              // this.setState({
              //   FromZipNotFoundErr: true,
              //   FromZipNotFoundErrText: "Zip code not found",
              // });
              if (this.state.FromSelectedCountry.label !== "China") {
                this.setState({
                  FromZipNotFoundErr: false,
                  FromZipNotFoundErrText: "",
                  ThankyouPageMoveFromZip: true,
                });
              }
            }
            if (this.state.FromSelectedCountry.value === 37) {
              if (
                this.state.FromZip.length < 5 ||
                /[^A-Za-z@.0-9\d]/.test(this.state.FromZip)
              ) {
                this.setState({
                  FromZipNotFoundErr: true,
                  FromZipNotFoundErrText:
                    "Please enter the zip code at list 5 character",
                });
              }
            }
            if (this.state.FromSelectedCountry.label !== "China") {
              this.state.flag = 1;
            }
            this.validate1();
            this.setState({ FromCityList: [] });
          }
        });
    } else if (this.state.GetRate.FromCountry.IsFedexCity === 0) {
      var GetRate = this.state.GetRate;
      GetRate.FromCity = null;
      GetRate.FromFedExCity = null;
      GetRate.FromUPSCity = null;
      GetRate.FromState = null;
      GetRate.FromZipCode = zip;
      this.setState({ GetRate: GetRate });
    } else {
      var GetRate = this.state.GetRate;
      GetRate.FromCity = null;

      GetRate.FromZipCode = zip;
      this.setState({ GetRate: GetRate });
    }
    // }
    this.setState({ disableBtn: 1 });
  };

  ChangeToZipUS = (e) => {
    this.setState({ TozipCodeError: e.target.value });

    this.setState({ disableBtn: 0 });
    if (e.target.name === "ToZipCode") {
      if (
        !e.target.value ||
        e.target.value === undefined ||
        e.target.value === null
      ) {
        this.setState({ ToZipError: false });
        this.show("ToZipCode", true, "ToZipError", "Please enter To zipcode");
      } else {
        this.setState({ ToZipError: false });
        this.show("ToZipCode", false, "ToZipError", "");
      }
    }

    var zip = e.target.value.trim().replace(/\s/g, "");
    let newzip = zip;
    let modifyzip = newzip.replaceAll(" ", "");
    this.setState({ ToZip: modifyzip });
    if (modifyzip.length) {
      var SelectedCity = { value: null, label: null };
      this.setState({
        ToFedExSelectedCity:
          this.state.ToIsFedxCity === 1
            ? this.state.ToFedExSelectedCity.value
            : "",
        ToUPSSelectedCity: SelectedCity,
        ToSelectedCity: SelectedCity,
      });

      fetch(
        CommonConfig.zipCodeAPIKey(
          modifyzip,
          this.state.ToSelectedCountry.label
        )
      )
        .then((result) => result.json())
        .then((data) => {
          if (data["status"] === "OK") {
            if (
              data["results"][0] &&
              data["results"][0].hasOwnProperty("postcode_localities")
            ) {
              var FinalCity = [];
              var state = "";
              var CityData = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "locality") {
                    return data.types[0] === "locality";
                  }
                }
              );

              var CityData2 = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "neighborhood") {
                    return data.types[0] === "neighborhood";
                  }
                }
              );

              var CityData3 = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "administrative_area_level_2") {
                    return data.types[0] === "administrative_area_level_2";
                  }
                }
              );

              var CityData4 = _.filter(
                data["results"][0]["address_components"],
                function (data) {
                  if (data.types[0] == "administrative_area_level_1") {
                    return data.types[0] === "administrative_area_level_1";
                  }
                }
              );

              if (CityData.length > 0) {
                CityData = CityData[0].long_name;
                FinalCity.push({
                  City_code: CityData,
                  Name: CityData,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              } else if (CityData2.length > 0) {
                CityData2 = CityData2[0].long_name;
                FinalCity.push({
                  City_code: CityData2,
                  Name: CityData2,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              } else if (CityData3.length > 0) {
                CityData3 = CityData3[0].long_name;
                FinalCity.push({
                  City_code: CityData3,
                  Name: CityData3,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              } else if (CityData4.length > 0) {
                CityData4 = CityData4[0].long_name;
                FinalCity.push({
                  City_code: CityData4,
                  Name: CityData4,
                });
                var SelectedCity = {
                  value: FinalCity[0].City_code,
                  label: FinalCity[0].Name,
                };
              }

              this.setState({ ToCityList: FinalCity });
              let toStatename = "";
              if (
                state == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                ).length > 0
              ) {
                state = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].short_name;

                toStatename = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].long_name;
              }
              var SelectedCity =
                FinalCity.length > 0
                  ? {
                      value: FinalCity[0].City_code,
                      label: FinalCity[0].Name,
                    }
                  : "";

              if (this.state.ToSelectedCountry.label === "China") {
                this.setState({
                  toStateName: state,
                  ToState: toStatename,
                  ToFedExSelectedCity: SelectedCity,
                });
              } else {
                this.setState({
                  toStateName: state,
                  ToState: toStatename,
                  ToSelectedCity: SelectedCity,
                  ToCity: SelectedCity ? SelectedCity.label : SelectedCity,
                });
              }
              if (FinalCity.length === 0) {
                this.getCityList(this.state.ToSelectedCountry.value, "from");
              }
            } else if (data["results"][0]) {
              var FinalCity = [];
              var city = "";
              var state = "";
              if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "locality";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "locality";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_3";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_3";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "political";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "political";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "neighborhood";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "neighborhood";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_2";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_2";
                  }
                )[0].long_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].long_name;
              } else if (
                city == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "locality";
                  }
                ).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "locality";
                  }
                )[0].long_name;
              } else if (city == "") {
                city = "";
              }

              let toStatename = "";
              if (
                state == "" &&
                _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                ).length > 0
              ) {
                state = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].short_name;
                toStatename = _.filter(
                  data["results"][0]["address_components"],
                  function (data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].long_name;
              }

              FinalCity.push({
                Citycode: city,
                CityName: city,
              });

              this.setState({
                ToCityList: [
                  {
                    City_code: FinalCity[0].Citycode,
                    Name: FinalCity[0].CityName,
                  },
                ],
                ToCity: FinalCity[0].Citycode,
                toStateName: state,
                ToState: toStatename,
              });

              var SelectedCity =
                FinalCity.length > 0
                  ? {
                      value: FinalCity[0].Citycode,
                      label: FinalCity[0].CityName,
                    }
                  : "";

              if (this.state.ToSelectedCountry.label === "China") {
                this.setState({ ToFedExSelectedCity: SelectedCity });
              } else {
                this.setState({ ToSelectedCity: SelectedCity });
              }
              if (FinalCity.length === 0) {
                this.getCityList(this.state.ToSelectedCountry.value, "from");
              }
            } else {
              this.setState({ ToCityList: [] });
            }
            this.setState({
              ToZipCodeErr: true,
              ToZipCodeHelperText: "",
              ToZipCodeEnterText: "",
              ToZipErrText: "",
              ToZipErr: false,
              ThankyouPageMoveToZip: false,
            });
            this.state.flag2 = 0;
          } else {
            if (this.state.ToSelectedCountry.label !== "China") {
              this.state.flag2 = 1;
              this.state.ThankyouPageMoveToZip = true;
            }
            if (this.state.ToZip.lenght > 4) {
              cogoToast.error("Zip code not found 2");
            }
            this.setState({ ToCityList: [] });
          }
        });
    } else {
    }
    this.setState({ disableBtn: 1 });
  };

  renderCityOptions = (type) => {
    if (type === "from") {
      return this.state.FromCityList.map((x) => {
        return <option value={x.CityCode}>{x.CityName}</option>;
      });
    } else {
      return this.state.ToCityList.map((x) => {
        return <option value={x.CityCode}>{x.CityName}</option>;
      });
    }
  };

  renderFedxCityOptions = (type) => {
    if (type === "from") {
      return this.state.FromFedExCityList.map((x) => {
        return <option value={x.CityCode}>{x.CityName}</option>;
      });
    } else {
      return this.state.ToFedExCityList.map((x) => {
        return <option value={x.CityCode}>{x.CityName}</option>;
      });
    }
  };

  ChangeFromCity = (event, type) => {
    if (type === "FedEx") {
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        this.setState({ FromFedExSelectedCity: "" });
        this.setState({ FromFedExSelectedCity: event });
      }
    } else if (type === "FedEx1") {
      this.setState({ FromFedExCityValue: event });

      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        this.setState({ FromFedExSelectedCity: "" });
        var fromcity = {
          value: event.target.value,
          label: event.target.value,
        };
        this.setState({ FromFedExSelectedCity: fromcity });
      }
    } else if (type === "UPS") {
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        let fromcity = {
          value: event.target.value,
          label: event.target.value,
        };
        this.setState({ FromUPSSelectedCity: fromcity });
      }
    } else {
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        let fromcity = {
          value: event.target.value,
          label: event.target.value,
        };
        this.setState({ FromSelectedCity: fromcity });
      }
    }
  };

  ChangeToCity = (event, type) => {
    if (type === "FedEx") {
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        this.setState({ ToFedExSelectedCity: "" });
        this.setState({ ToFedExSelectedCity: event });
      }
    } else if (type === "FedEx1") {
      this.setState({ ToFedExCityValue: event });
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        this.setState({ ToFedExSelectedCity: "" });
        let tocity = {
          value: event.target.value,
          label: event.target.value,
        };
        this.setState({ ToFedExSelectedCity: tocity });
      }
    } else if (type === "UPS") {
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        let tocity = {
          value: event.target.value,
          label: event.target.value,
        };
        this.setState({ ToUPSSelectedCity: tocity });
      }
    } else {
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        let tocity = {
          value: event.target.value,
          label: event.target.value,
        };
        this.setState({ ToSelectedCity: tocity });
      }
    }
  };
  shipperInfoChange = (event, type) => {
    if (type === "ContactName") {
      this.setState({ ContactName: event.target.value });
    } else if (type === "Number") {
      this.setState({ PhoneNumber: event.target.value });
    } else if (type === "Email") {
      this.setState({ email: event.target.value });
    }
  };
  validateShipperInfo = (evt, type) => {
    if (type == "cname") {
      if (this.state.ContactName != "") {
        if (this.state.ContactName.trim().length < 3) {
          stepValidate = false;
          allValid = false;
          this.setState({
            cnameErrText: "Please enter atleast 3 character",
          });
        } else {
          if (this.state.PhoneNumber != "" && this.state.email != "") {
            stepValidate = true;
            allValid = true;
          } else {
            stepValidate = false;
            allValid = false;
          }
        }
      } else {
        stepValidate = false;
        allValid = false;
        this.setState({
          cnameErrText: "",
        });
      }
    } else if (type === "phone") {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      let emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        this.setState({
          onlyNumberErrText: "Enter only digits",
        });
        stepValidate = false;
        allValid = false;
        return false;
      } else if (this.state.email != "") {
        stepValidate = true;
        allValid = true;
        return true;
      } else {
        stepValidate = false;
        allValid = false;
      }
    } else if (type === "phoneblur") {
      var phonenoRegex = /^\d{10}$/;
      if (this.state.PhoneNumber != "") {
        if (
          this.state.PhoneNumber.length < 10 ||
          !phonenoRegex.test(this.state.PhoneNumber)
        ) {
          this.setState({
            contactErrText: "Please enter valid phone number",
          });
          stepValidate = false;
          allValid = false;
        } else if (this.state.email != "") {
          stepValidate = true;
          allValid = true;
        } else {
          stepValidate = false;
          allValid = false;
        }
      } else {
        stepValidate = false;
        allValid = false;
        this.setState({
          contactErrText: "Please enter valid phone number",
        });
      }
    } else if (type === "email") {
      let emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.state.email != "") {
        if (!emailRegex.test(this.state.email)) {
          this.setState({
            EmailErrText: "Please enter valid email",
          });
          stepValidate = false;
          allValid = false;
        } else {
          stepValidate = true;
          allValid = true;
        }
      } else {
        stepValidate = false;
        allValid = false;
      }
    }
  };

  addBoxes = () => {
    this.setState({ submitList: this.state.allpackagesValue });
    this.setState((prevState) => ({
      allpackagesValue: [
        ...prevState.allpackagesValue,
        {
          ActualWeight: "",
          ChargeableWeight: "0",
          DimensionH: "",
          DimensionL: "",
          DimensionW: "",
          Quantity: "1",
          PackageType: "1",
          Status: "Active",
        },
      ],
    }));
  };

  removeBoxes = (i) => {
    let allpackagesValue = [...this.state.allpackagesValue];
    allpackagesValue.splice(i, 1);
    this.setState({ allpackagesValue });
  };

  getBoxesData = (i, e) => {
    this.setState({ getWidthvalue: e.target });
    const { name, value } = e.target;

    console.log("checkboxesinput", e);
    console.log("checkboxesinputi", i);

    let allpackagesValue = [...this.state.allpackagesValue];
    allpackagesValue[i] = { ...allpackagesValue[i], [name]: value };
    this.setState({ allpackagesValue });
  };

  getTelevisionData = (i, e) => {
    const { name, value } = e.target;
    let allTelevisionValue = [...this.state.allTelevisionValue];
    allTelevisionValue[i] = { ...allTelevisionValue[i], [name]: value };
    this.setState({ allTelevisionValue });
  };

  addTelevision = () => {
    this.setState((prevState) => ({
      allTelevisionValue: [
        ...prevState.allTelevisionValue,
        {
          ActualWeight: "",
          ChargeableWeight: "0",
          DimensionH: "",
          DimensionL: "",
          DimensionW: "",
          Quantity: "1",
          PackageType: "4",
          Status: "Active",
          TVMake: "",
          TVModel: "",
        },
      ],
    }));
  };

  removeTelevision = (i) => {
    let allTelevisionValue = [...this.state.allTelevisionValue];
    allTelevisionValue.splice(i, 1);
    this.setState({ allTelevisionValue });
  };

  addAutoData = (i, e) => {
    const { name, value } = e.target;
    let allAutoValue = [...this.state.allAutoValue];
    allAutoValue[i] = { ...allAutoValue[i], [name]: value };
    this.setState({ allAutoValue });
  };

  addAuto = () => {
    this.setState((prevState) => ({
      allAutoValue: [
        ...prevState.allAutoValue,
        {
          CarMake: "",
          CarModel: "",
          CarYear: "",
          PackageType: "5",
          Status: "Active",
        },
      ],
    }));
  };
  removeAuto = (i) => {
    let allAutoValue = [...this.state.allAutoValue];
    allAutoValue.splice(i, 1);
    this.setState({ allAutoValue });
  };

  boxesPackagesDetails() {
    var nopack = [];
    var temp = document.getElementsByName("BoxDetails[No_Pack]");
    var boxarray = [].concat.apply(nopack, temp);
    var No_packBoxDetails = boxarray.map((x) => {
      return x.value;
    });
    var weightpack = [];
    var temp = document.getElementsByName("BoxDetails[Weight]");
    var boxweightarray = [].concat.apply(weightpack, temp);
    var WeightBoxDetails = boxweightarray.map((x) => {
      return x.value;
    });
    console.log("boxesdetailsP", No_packBoxDetails);
    console.log("boxesdetailsW", WeightBoxDetails[0]);
    this.setState({
      WeightBoxDetailsValue: WeightBoxDetails[0],
    });
  }

  async componentDidMount() {
    this.renderCountryOptions();
    let dummyTxt = "1234567890123456";

    let joy = dummyTxt.match(/.{1,4}/g);
    this.state.new = joy.join(" ");
    //setTimeout(() => {
    await this.GetCountry();

    if (localStorage.getItem("loggedInUserData")) {
      var dataTest = JSON.parse(localStorage.getItem("loggedInUserData"));
      this.setState({
        PersonID: CommonConfig.loggedInUserData().PersonID,
        userName: CommonConfig.loggedInUserData().Name,
        UserAccess: dataTest.userModuleAccess[9].WriteAccess,
      });
    }
    var queryString = new Array();
    if (queryString.length == 0) {
      if (window.location.search.split("?").length > 1) {
        var params2 = window.location.search.split("?")[1].split("&");
        for (var i = 0; i < params2.length; i++) {
          var key = params2[i].split("=")[0];
          var value = decodeURIComponent(params2[i].split("=")[1]);
          queryString[key] = value;
        }
      }
    }

    if (queryString["package"] != null) {
      var packageDetailsArr = queryString["package"].split(",");

      for (var i = 0; i < packageDetailsArr.length; i++) {
        var packageName = "";
        if (packageDetailsArr[i] == "2") {
          packageName = "envelope";
        } else if (packageDetailsArr[i] == "1") {
          packageName = "box";
        } else if (packageDetailsArr[i] == "3") {
          packageName = "furniture";
        } else if (packageDetailsArr[i] == "4") {
          packageName = "television";
        } else if (packageDetailsArr[i] == "5") {
          packageName = "auto";
        }
        console.log(" packageDetailsArr[i] = ", packageDetailsArr[i]);
        console.log("packageName = ", packageName);
        this.packageDetailsChange("", packageDetailsArr[i], packageName);
        setTimeout(() => {
          // this.showLoader();
          this.navigateChange(1);
        }, 10);
      }
    }
    if (queryString["fullname"] != null && queryString["email"] != null) {
      var blogName = queryString["fullname"];
      var blogEmail = queryString["email"];
      var blogPhone = queryString["phone"];

      document.getElementById("ContactName").value = blogName;
      document.getElementById("Number").value = blogPhone;
      document.getElementById("email").value = blogEmail;

      this.setState({
        ContactName: blogName,
        email: blogEmail,
        PhoneNumber: blogPhone,
      });
    }
    setTimeout(() => {
      var from_country_home = parseInt(queryString["fromcountry"]);
      var to_country_home = parseInt(queryString["tocountry"]);
      this.state.page_redirectionPath = queryString["pagePath"];

      if (
        this.state.page_redirectionPath == undefined ||
        this.state.page_redirectionPath == ""
      ) {
        this.setState({ page_redirectionPath: "rates.sflworldwide.com" });
      } else {
        this.setState({
          page_redirectionPath: this.state.page_redirectionPath,
        });
      }

      if (
        from_country_home != undefined &&
        from_country_home != "" &&
        !isNaN(from_country_home)
      ) {
        var selectedCountryList = _.filter(this.state.tempCountryList[0], {
          CountryID: from_country_home,
        });

        var SelectedCountry = {
          value: selectedCountryList[0].CountryID,
          label: selectedCountryList[0].CountryName,
        };

        this.state.USSelectedOption.label = selectedCountryList[0].CountryName;
        this.state.USSelectedOption.value = selectedCountryList[0].CountryID;

        this.setState({
          FromSelectedCountry: SelectedCountry,
          FromIsFedxCity: selectedCountryList[0].IsFedexCity,
        });

        if (selectedCountryList[0].IsZipAvailable === 0) {
          this.setState({ hidefromzipcode: false });
        } else {
          this.setState({ hidefromzipcode: true });
        }
        this.getCityList(selectedCountryList[0].CountryID, "from");
        document.getElementById("fromCountrySelect").value =
          selectedCountryList[0].CountryID;
      }
      if (
        from_country_home != undefined &&
        from_country_home != "" &&
        !isNaN(from_country_home)
      ) {
        document.getElementById("fromCountrySelect").value =
          selectedCountryList[0].CountryID;
      } else {
        document.getElementById("fromCountrySelect").value = 202;
      }

      if (
        to_country_home != undefined &&
        to_country_home != "" &&
        !isNaN(to_country_home)
      ) {
        var selectedToCountryList = _.filter(this.state.tempCountryList[0], {
          CountryID: to_country_home,
        });

        var SelectedToCountry = {
          value: selectedToCountryList[0].CountryID,
          label: selectedToCountryList[0].CountryName,
        };

        this.setState({
          ToSelectedCountry: SelectedToCountry,
          ToIsFedxCity: selectedToCountryList[0].IsFedexCity,
        });

        if (selectedToCountryList[0].IsZipAvailable === 0) {
          this.setState({ hidetozipcode: false });
        } else {
          this.setState({ hidetozipcode: true });
        }

        this.getCityList(selectedToCountryList[0].CountryID, "to");
        document.getElementById("toCountrySelect").value =
          selectedToCountryList[0].CountryID;
      }
    }, 10);

    this.setState({
      boxDetails: this.state.tempboxDetails,
      tvDetails: this.state.tempTvDetails,
      carDetails: this.state.tempCarDetails,
    });

    // Box Quantity------------------

    // let mainCountryList = [];
    // for (var i = 0; i < Country?.length; i++) {
    //   let mainCountryObject = {};
    //   mainCountryObject.label = Country[i]?.CountryName;
    //   mainCountryObject.value = Country[i]?.CountryID;
    //   mainCountryList.push(mainCountryObject);
    //   console.log("checkdatttttab", mainCountryList);
    //   this.setState({ CountryListValue: mainCountryList });

    var noOfBox = [];
    for (var i = 1; i <= 25; i++) {
      let mainBoxObject = {};
      mainBoxObject.label = i;
      mainBoxObject.value = i;
      noOfBox.push(mainBoxObject);
      console.log("chekkdatttaaaaa", noOfBox);
      this.setState({ noOfBoxinPackeges: noOfBox });
    }
  }

  backStep = () => {
    var AllPackegeValue = [];

    if (this.state.showBoxDetails === true) {
      AllPackegeValue.push(...this.state.allpackagesValue);

      var BoxesStepValue = this.state.allpackagesValue[0]?.PackageType;
    }
    if (this.state.showCarDetails === true) {
      AllPackegeValue.push(...this.state.allAutoValue);

      var AutoStepValue = this.state.allAutoValue[0]?.PackageType;
    }
    if (this.state.showTVDetails === true) {
      AllPackegeValue.push(...this.state.allTelevisionValue);

      var TelevisionStepValue = this.state.allTelevisionValue[0]?.PackageType;
    }
    if (this.state.ShowEnvelop === true) {
      AllPackegeValue.push(...this.state.EnvelopValue);

      var EnvelopStepValue = this.state.EnvelopValue[0]?.PackageType;
    }
    if (this.state.Showfurniture === true) {
      AllPackegeValue.push(...this.state.AllfurnitureValue);

      var FurnitureStepValue = this.state.AllfurnitureValue[0]?.PackageType;
    }
    console.log("checkfurniturevalus", FurnitureStepValue);

    console.log("checkdaaataaaact", this.state.SetMultiStep);
    if (AutoStepValue === "5" && FurnitureStepValue === "3") {
      if ((document.getElementById("step3").className = "active")) {
        document.getElementById("step3").className = "active";
        document.getElementById("step4").className = "";
        document.getElementById("shipperdetails").style.display = "block";
        document.getElementById("shipsmart").style.display = "none";
        this.setState({
          SetMultiStep: "Active",
        });
      }
      if (this.state.SetMultiStep === "Active") {
        window.location.reload();
      }
    } else {
      if (
        this.state.SelectedPakage === "box" ||
        this.state.SelectedPakage === "television" ||
        this.state.SelectedPakage === "auto"
      ) {
        // console.log("StepThirdtoSecond", this.state.StepThirdtoSecond);
        // this.state.LastStatus === "Active"
        if (document.getElementById("step4").className === "active") {
          document.getElementById("step3").className = "active";
          document.getElementById("step4").className = "";
          document.getElementById("step2").className = "";
          document.getElementById("shipperdetails").style.display = "block";
          document.getElementById("shipsmart").style.display = "none";
          // this.setState({
          //   ContactValidation: "Active",
          // });
          this.setState({
            LastStatus: "",
          });
        } else if (document.getElementById("step3").className === "active") {
          document.getElementById("step2").className = "active";
          document.getElementById("step3").className = "";
          document.getElementById("shipmentdetails").style.display = "block";
          document.getElementById("shipperdetails").style.display = "none";
          this.setState({
            StepThirdtoSecond: "Active",
          });
        } else if (document.getElementById("step3").className === "active") {
          document.getElementById("step2").className = "active";
          document.getElementById("step3").className = "";
          document.getElementById("shipmentdetails").style.display = "block";
          document.getElementById("shipperdetails").style.display = "none";
        } else if (document.getElementById("step2").className === "active") {
          document.getElementById("step1").className = "active";
          window.location.reload();
        }
      }
      console.log("enveleopeActive", this.state.EnvelopeStep3TO1);

      if (
        this.state.SelectedPakage === "envelope" ||
        this.state.SelectedPakage === "furniture"
      ) {
        if (this.state.EnvelopeStep4TO3 === "Active") {
          // document.getElementById("step1").className = "active";
        } else if ((document.getElementById("step4").className = "active")) {
          this.setState({
            FirstStep: "Active",
          });
          this.setState({
            SetMultiStep: "",
          });
          this.setState({
            LocationStatus: "",
          });
          document.getElementById("step3").className = "active";
          document.getElementById("step4").className = "";
          document.getElementById("shipperdetails").style.display = "block";
          document.getElementById("shipsmart").style.display = "none";
        } else if ((document.getElementById("step3").className = "active")) {
          document.getElementById("step2").className = "active";
          document.getElementById("step3").className = "";
          document.getElementById("shipmentdetails").style.display = "block";
          document.getElementById("shipperdetails").style.display = "none";
          // window.location.reload();
        }

        if (this.state.FirstStep === "Active") {
          document.getElementById("step1").className = "active";
          window.location.reload();
        }
        // if (FurnitureStepValue === "3") {
        //   window.location.reload();
        // }

        console.log("checkbackdata", this.state.FirstStep);
      }
    }
  };
  // navigateChangeprevious = (key) => {
  //   this.backStep();
  // };

  navigateChangeprevious = (key) => {
    debugger;
    let stepsList = this.state.Steps;
    let activeIndex = stepsList.findIndex((x) => x.classname === "active");
    this.setState({ activeIndex: activeIndex });
    if (
      activeIndex == 1 &&
      this.state.Steps[activeIndex].stepId == "packagedetails"
    ) {
      document.getElementById("step3").className = "active";
      document.getElementById("step1").className = "";
      this.setState({ showBoxDetails: true });
    } else if (
      activeIndex == 2 &&
      this.state.Steps[activeIndex].stepId == "shipmentdetails"
    ) {
      document.getElementById("step1").className = "active";
      document.getElementById("step2").className = "";
    } else if (
      activeIndex == 3 &&
      this.state.Steps[activeIndex].stepId == "shipsmart"
    ) {
      document.getElementById("step2").className = "active";
      document.getElementById("step4").className = "";
    }
    if (activeIndex != 0) {
      if (key !== activeIndex) {
        this.setState({ NextButtonIdx: key });
        stepsList[key]["classname"] = "active";
        stepsList[activeIndex]["classname"] = "inactive";
        this.setState({ Steps: stepsList });
        let divID = stepsList[key]["stepId"];
        let activeDiv = stepsList[activeIndex]["stepId"];
        document.getElementById(divID).style.display = "block";
        document.getElementById(activeDiv).style.display = "none";
      }
    }
  };

  nextStep = () => {
    this.setState({
      EnvelopeStep3TO1: "Active",
    });
    debugger;

    var AllPackegeValue = [];

    if (this.state.showBoxDetails === true) {
      AllPackegeValue.push(...this.state.allpackagesValue);

      var BoxesStatusValue = this.state.allpackagesValue[0]?.PackageType;
    }
    if (this.state.showCarDetails === true) {
      AllPackegeValue.push(...this.state.allAutoValue);

      var AutoStatusValue = this.state.allAutoValue[0]?.PackageType;
    }
    if (this.state.showTVDetails === true) {
      AllPackegeValue.push(...this.state.allTelevisionValue);

      var TelevisionStatusValue = this.state.allTelevisionValue[0]?.PackageType;
    }
    if (this.state.ShowEnvelop === true) {
      AllPackegeValue.push(...this.state.EnvelopValue);

      var EnvelopStatusValue = this.state.EnvelopValue[0]?.PackageType;
    }
    if (this.state.Showfurniture === true) {
      AllPackegeValue.push(...this.state.AllfurnitureValue);

      var FurnitureStatusValue = this.state.AllfurnitureValue[0]?.PackageType;
    }

    if (
      // this.state.SelectedPakage === "box" ||
      // this.state.checkSelectedPakage === "television"||
      // this.state.checkSelectedPakage === "auto"
      // // AutoStatusValue === "5"||
      (BoxesStatusValue === "1" && FurnitureStatusValue === undefined) ||
      (TelevisionStatusValue === "4" && FurnitureStatusValue === undefined) ||
      (AutoStatusValue === "5" && FurnitureStatusValue === undefined)
    ) {
      document.getElementById("step2").className = "active";
      document.getElementById("step1").className = "";

      var element = "";
      element = document.getElementById("nave");
      // element.classList.remove("hidenave");
      element.classList.remove("three-section");

      this.setState({
        PackageStatus: "Active",
      });

      if (BoxesStatusValue === "1") {
        if (!this.state.PackageStatus) {
          this.setState({
            PackageDetailsErr: "",
          });
        } else if (!this.state.BoxWeightvalue) {
          this.setState({
            PackageDetailsErr: "Please enter correct Weight",
          });
        } else if (!this.state.BoxDimantionLengthValue) {
          this.setState({
            PackageDetailsErr: "Please enter valid weight",
          });
        } else if (!this.state.BoxDimantionWidthValue) {
          this.setState({
            PackageDetailsErr: "Please enter Dimensions Width",
          });
        } else if (!this.state.BoxDimantionHeightValue) {
          this.setState({
            PackageDetailsErr: "Please enter Dimensions Height",
          });
        }
        if (
          this.state.BoxWeightvalue > 0
          // &&
          // this.state.BoxDimantionLengthValue &&
          // this.state.BoxDimantionWidthValue &&
          // this.state.BoxDimantionHeightValue
        ) {
          console.log(
            "this.state.BoxWeightvalue = ",
            this.state.BoxWeightvalue
          );
          if (this.state.PackageStatus === "Active") {
            document.getElementById("step4").className = "";
            document.getElementById("step3").className = "active";
            document.getElementById("step2").className = "";
            document.getElementById("step1").className = "";
            this.setState({
              ContactStatus: "Active",
            });
            document.getElementById("shipperdetails").style.display = "block";
            document.getElementById("shipmentdetails").style.display = "none";
            document.getElementById("shipsmart").style.display = "none";
            this.setState({
              PackageDetailsErr: "",
              BoxDimantionLengthErr: "",
            });
          }
        } else {
          // this.setState({
          //   PackageDetailsErr: "Please enter valid Weight",
          // });
        }
      } else if (TelevisionStatusValue === "4") {
        if (!this.state.PackageStatus) {
          this.setState({
            PackageDetailsErr: "",
          });
        } else if (!this.state.TelBrandName) {
          this.setState({
            PackageDetailsErr: "Please enter Brand Name",
          });
        } else if (!this.state.TelModel) {
          this.setState({
            PackageDetailsErr: "Please enter Television Model",
          });
        } else if (!this.state.TelWeight) {
          this.setState({
            PackageDetailsErr: "Please enter Television Weigth",
          });
        } else if (!this.state.TelDLength) {
          this.setState({
            PackageDetailsErr: "Please enter Television Dimentions Length",
          });
        } else if (!this.state.TelDWeight) {
          this.setState({
            PackageDetailsErr: "Please enter Television Dimentions Weight",
          });
        } else if (!this.state.TelDHeight) {
          this.setState({
            PackageDetailsErr: "Please enter Television Dimentions Height",
          });
        }
        if (
          this.state.TelBrandName &&
          this.state.TelBrandName &&
          this.state.TelModel &&
          this.state.TelWeight
          // &&
          // this.state.TelDLength &&
          // this.state.TelDWeight &&
          // this.state.TelDHeight
        ) {
          if (this.state.PackageStatus === "Active") {
            document.getElementById("step4").className = "";
            document.getElementById("step3").className = "active";
            document.getElementById("step2").className = "";
            document.getElementById("step1").className = "";
            this.setState({
              ContactStatus: "Active",
            });

            document.getElementById("shipperdetails").style.display = "block";
            document.getElementById("shipmentdetails").style.display = "none";
            document.getElementById("shipsmart").style.display = "none";
            this.setState({
              PackageDetailsErr: "",
              BoxDimantionLengthErr: "",
            });
          }
        }
      } else if (AutoStatusValue === "5") {
        if (!this.state.PackageStatus) {
          this.setState({
            PackageDetailsErr: "",
          });
        } else if (!this.state.AutoBrandName) {
          this.setState({
            PackageDetailsErr: "Please enter Auto Brand Name",
          });
        } else if (!this.state.AutoCarModel) {
          this.setState({
            PackageDetailsErr: "Please enter Auto Car Model",
          });
        } else if (!this.state.AutoCarYear) {
          this.setState({
            PackageDetailsErr: "Please enter Auto Car Year",
          });
        }
        if (
          this.state.AutoBrandName &&
          this.state.AutoCarModel &&
          this.state.AutoCarYear
        ) {
          {
            if (this.state.PackageStatus === "Active") {
              document.getElementById("step4").className = "";
              document.getElementById("step3").className = "active";
              document.getElementById("step2").className = "";
              document.getElementById("step1").className = "";
              this.setState({
                ContactStatus: "Active",
              });
              document.getElementById("shipperdetails").style.display = "block";
              document.getElementById("shipmentdetails").style.display = "none";
              document.getElementById("shipsmart").style.display = "none";
              this.setState({
                PackageDetailsErr: "",
                BoxDimantionLengthErr: "",
              });
            }
          }
        }
      }
      if (this.state.ContactStatus === "Active") {
        this.setState({
          ContactValidation: "Active",
        });
      }
      if (this.state.ContactValidation === "Active") {
        this.setState({
          cnameErrText: "",
          ContactNumberErrText: "",
          EmailErrText: "",
        });
      } else if (this.state.LastStatus) {
        stepValidate = false;
        allValid = false;
        this.setState({
          cnameErrText: "Please enter contact name",
          ContactNumberErrText: "Please enter phone number",
          EmailErrText: "Please enter email",
        });
      }
      if (this.state.ContactName) {
        stepValidate = true;
        allValid = true;
        this.setState({
          cnameErrText: "",
        });
      }
      if (this.state.email) {
        stepValidate = true;
        allValid = true;
        this.setState({
          EmailErrText: "",
        });
      }
      if (this.state.PhoneNumber) {
        stepValidate = true;
        allValid = true;
        this.setState({
          ContactNumberErrText: "",
        });
      }

      console.log("checkContactValidation", this.state.LastStatus);

      if (
        this.state.ContactName &&
        this.state.PhoneNumber &&
        this.state.email
      ) {
        if (
          this.state.LastStatus === "Active" &&
          stepValidate === true &&
          allValid === true
        ) {
          var PackageRes = [];
          var PersonList = [];
          var finalManagedBy = [];
          var ManagedBY = "";
          var Access = 0;
          var elsecalled = 0;
          var PackageName = "";
          var newpackagetype = "";

          if (this.state.documentData[0] == 2) {
            newpackagetype = "Document";
          }
          if (this.state.documentData[0] == 1) {
            newpackagetype = "Boxes";
          }
          if (this.state.documentData[0] == 4) {
            newpackagetype = "Television";
          }
          if (this.state.documentData[0] == 3) {
            newpackagetype = "Furniture";
          }
          if (this.state.documentData[0] == 5) {
            newpackagetype = "Auto";
          }
          var manageData = {};

          {
            this.state.PersonID
              ? (manageData = {
                  Email: this.state.email,
                  Phone: this.state.PhoneNumber,
                  PersonID: this.state.PersonID,
                  newpackagetype: newpackagetype,
                })
              : (manageData = {
                  Email: this.state.email,
                  Phone: this.state.PhoneNumber,
                  PersonID: 0,
                  newpackagetype: newpackagetype,
                });
          }
          this.showLoader();
          setTimeout(() => {
            api
              .post("salesLead/getManagedByPhoneOREmail", manageData)
              .then((res) => {
                if (res.data.length > 0) {
                  ManagedBY = res.data[0].ManagedBy;
                  var counterData = {
                    PersonID: res.data[0].ManagedBy,
                  };
                }
                api
                  .post("userManagement/updateLeadCounter", counterData)
                  .then((counterDatares) => {});

                for (var index = 0; index < AllPackegeValue.length; index++) {
                  if (AllPackegeValue[index].DimensionL == "") {
                    AllPackegeValue[index].DimensionL = 1;
                  }
                  if (AllPackegeValue[index].DimensionW == "") {
                    AllPackegeValue[index].DimensionW = 1;
                  }
                  if (AllPackegeValue[index].DimensionH == "") {
                    AllPackegeValue[index].DimensionH = 1;
                  }
                }

                var salesLeadData = {
                  urlredirect_path: this.state.page_redirectionPath,
                  userid: 1,
                  SalesLeadManagementID: null,
                  ManagedBy: ManagedBY,
                  SalesLeadsType: null,
                  ContactName: this.state.ContactName,
                  CompanyName: "",
                  Email: this.state.email,
                  PhoneNumber: this.state.PhoneNumber,
                  FromState: this.state.FromState,
                  FromCity:
                    this.state.FromCity === ""
                      ? this.state.FromFedExCityValue.label
                      : this.state.FromCity,
                  ToCity:
                    this.state.ToCity === ""
                      ? this.state.ToFedExCityValue.label
                      : this.state.ToCity,
                  FromZipCode: this.state.FromZip,
                  ToZipCode: this.state.ToZip,
                  FromCountryID: this.state.FromSelectedCountry.value,
                  ToState: this.state.ToState,
                  ToCountryID: this.state.ToSelectedCountry.value,
                  SalesLeadDate: null,
                  SalesLeadFollowupDate: null,
                  TentativeMoveDate: null,
                  ReferredBy: "",
                  IPAddress: null,
                  MACAddress: null,
                  DeliveryType:
                    this.state.IsResidential == 1
                      ? "Residential"
                      : "Commercial",
                  ProposalStatus: "New",
                  PackageList: AllPackegeValue,

                  CarList: [],
                  NoteList: null,
                  WeightType: null,
                };
                setTimeout(() => {
                  api
                    .post("salesLead/addSalesLead", salesLeadData)
                    .then((saleres) => {
                      console.log("salesLeadData = ", salesLeadData);
                      if (
                        this.state.FromSelectedCountry.value ===
                        this.state.ToSelectedCountry.value
                      ) {
                        this.GetSuccessPage();
                      }
                      console.log(
                        "TelevisionStatusValue = ",
                        TelevisionStatusValue
                      );
                      var Quantity = 0;

                      for (
                        var index = 0;
                        index < AllPackegeValue.length;
                        index++
                      ) {
                        console.log(
                          "AllPackegeValue[index] = ",
                          AllPackegeValue[index].Quantity
                        );
                        Quantity += Number(AllPackegeValue[index].Quantity);
                      }
                      console.log("Quantity = ", Quantity);

                      if (Quantity > 4) {
                        this.GetSuccessPage();
                      }
                      if (AutoStatusValue === "5") {
                        this.GetSuccessPage();
                      }
                      if (TelevisionStatusValue == "4") {
                        this.GetSuccessPage();
                      }
                      if (this.state.CheckZipCode === "ZERO_RESULTS") {
                        this.GetSuccessPage();
                      }

                      var salesLeadID = saleres.data;
                      var TotalLength = 0;
                      var TotalWidth = 0;
                      var TotalHeight = 0;
                      var PackageDetails = [];
                      for (
                        var index = 0;
                        index < AllPackegeValue.length;
                        index++
                      ) {
                        console.log(
                          "checkdataaaconsole",
                          AllPackegeValue.length
                        );

                        console.log(
                          "checkdataaaconsole",
                          AllPackegeValue[index]
                        );
                        TotalLength += Number(
                          AllPackegeValue[index].DimensionL
                        );
                        TotalWidth += Number(AllPackegeValue[index].DimensionW);
                        TotalHeight += Number(
                          AllPackegeValue[index].DimensionH
                        );
                        var packageOBJ = {
                          PackageNumber: AllPackegeValue[index].Quantity,
                          PackageWeight: AllPackegeValue[index].ActualWeight,
                          PackageWidth: AllPackegeValue[index].DimensionW,
                          PackageLength: AllPackegeValue[index].DimensionL,
                          PackageHeight: AllPackegeValue[index].DimensionH,
                          PackageChargableWeight: 0,
                          PackageInsuredValue: 0,
                        };
                        PackageDetails.push(packageOBJ);
                      }
                      var TotalChargeWeight = 0;
                      var TotalInsuredValue = 0;
                      var TotalWeight = 0;
                      var TotalChargable = 0;
                      var ChargableWeight = [];
                      var filterFromCountryData = this.state.CountryList.filter(
                        (x) =>
                          x.CountryID == this.state.FromSelectedCountry.value
                      );
                      var filterToCountryData = this.state.CountryList.filter(
                        (x) => x.CountryID == this.state.ToSelectedCountry.value
                      );
                      if (
                        filterFromCountryData[0].CountryCode &&
                        filterToCountryData[0].CountryCode
                      ) {
                        for (var i = 0; i < PackageDetails.length; i++) {
                          var WE = 0;
                          var LE = 0;
                          var HE = 0;
                          var Insure = 0;
                          var Total = 0;
                          var Weight = 0;
                          var Chargable = 0;
                          if (PackageDetails[i].PackageWeight) {
                            Weight =
                              Number(PackageDetails[i].PackageWeight) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageWidth) {
                            WE = Number(PackageDetails[i].PackageWidth);
                          }

                          if (PackageDetails[i].PackageLength) {
                            LE = Number(PackageDetails[i].PackageLength);
                          }

                          if (PackageDetails[i].PackageHeight) {
                            HE = Number(PackageDetails[i].PackageHeight);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "US" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 166)) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 139)) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "IN" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(
                                parseFloat(parseFloat(Total) / parseFloat(2.2))
                              ) * Number(PackageDetails[i].PackageNumber);
                          }

                          if (Weight > Total) {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Weight);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Weight);
                          } else {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Total);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Total);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            ChargableWeight.push(
                              PackageDetails[
                                i
                              ].PackageChargableWeight.toString()
                            );
                          }

                          if (PackageDetails[i].PackageInsuredValue) {
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            PackageDetails[i].PackageInsuredValue = 0;
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            Chargable = Number(
                              PackageDetails[i].PackageChargableWeight
                            );
                          }

                          TotalInsuredValue =
                            Number(TotalInsuredValue) + Number(Insure);
                          TotalWeight = Number(TotalWeight) + Number(Weight);
                          TotalChargable =
                            Number(TotalChargable) + Number(Chargable);
                        }
                      }
                      var PackageNumber1 = [];
                      var Weight1 = [];
                      var DimeL1 = [];
                      var DimeW1 = [];
                      var DimeH1 = [];
                      var ChargableWeight1 = [];
                      var InsuredValues1 = [];

                      var PackagedetailsFinalValues = [];

                      var TotalPackageNumber1 = 0;
                      var TotalLength1 = 0;
                      var TotalWidth1 = 0;
                      var TotalHeight1 = 0;
                      var TotalInsuredValues1 = 0;
                      for (var i = 0; i < PackageDetails.length; i++) {
                        if (PackageDetails[i].PackageNumber) {
                          TotalPackageNumber1 =
                            Number(TotalPackageNumber1) +
                            parseInt(PackageDetails[i].PackageNumber);
                          PackageNumber1.push(
                            PackageDetails[i].PackageNumber.toString()
                          );
                        } else {
                          PackageDetails[i].PackageNumber = "1";
                          TotalPackageNumber1 =
                            Number(TotalPackageNumber1) +
                            parseInt(PackageDetails[i].PackageNumber);
                          PackageNumber1.push(
                            PackageDetails[i].PackageNumber.toString()
                          );
                        }
                        Weight1.push(
                          PackageDetails[i].PackageWeight.toString()
                        );

                        if (PackageDetails[i].PackageLength.toString()) {
                          DimeL1.push(
                            PackageDetails[i].PackageLength.toString()
                          );
                        } else {
                          PackageDetails[i].PackageLength = "1";
                          DimeL1.push(
                            PackageDetails[i].PackageLength.toString()
                          );
                        }

                        if (PackageDetails[i].PackageWidth) {
                          DimeW1.push(
                            PackageDetails[i].PackageWidth.toString()
                          );
                        } else {
                          PackageDetails[i].PackageWidth = "1";
                          DimeW1.push(
                            PackageDetails[i].PackageWidth.toString()
                          );
                        }

                        if (PackageDetails[i].PackageHeight) {
                          DimeH1.push(
                            PackageDetails[i].PackageHeight.toString()
                          );
                        } else {
                          PackageDetails[i].PackageHeight = "1";
                          DimeH1.push(
                            PackageDetails[i].PackageHeight.toString()
                          );
                        }

                        if (PackageDetails[i].PackageChargableWeight) {
                          ChargableWeight1.push(
                            PackageDetails[i].PackageChargableWeight.toString()
                          );
                        }

                        if (PackageDetails[i].PackageInsuredValue) {
                          InsuredValues1.push(
                            PackageDetails[i].PackageInsuredValue.toString()
                          );
                        } else {
                          PackageDetails[i].PackageInsuredValue = "0";
                          InsuredValues1.push(
                            PackageDetails[i].PackageInsuredValue.toString()
                          );
                        }
                        TotalLength1 += parseInt(
                          PackageDetails[i].PackageLength
                        );
                        TotalWidth1 += parseInt(PackageDetails[i].PackageWidth);
                        TotalHeight1 += parseInt(
                          PackageDetails[i].PackageHeight
                        );
                        TotalInsuredValues1 += parseInt(
                          PackageDetails[i].PackageInsuredValue
                        );
                      }

                      TotalChargeWeight = 0;
                      TotalInsuredValue = 0;
                      TotalWeight = 0;
                      TotalChargable = 0;
                      ChargableWeight = [];
                      if (
                        filterFromCountryData[0].CountryCode &&
                        filterToCountryData[0].CountryCode
                      ) {
                        for (var i = 0; i < PackageDetails.length; i++) {
                          var WE = 0;
                          var LE = 0;
                          var HE = 0;
                          var Insure = 0;
                          var Total = 0;
                          var Weight = 0;
                          var Chargable = 0;
                          if (PackageDetails[i].PackageWeight) {
                            Weight =
                              Number(PackageDetails[i].PackageWeight) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageWidth) {
                            WE = Number(PackageDetails[i].PackageWidth);
                          }

                          if (PackageDetails[i].PackageLength) {
                            LE = Number(PackageDetails[i].PackageLength);
                          }

                          if (PackageDetails[i].PackageHeight) {
                            HE = Number(PackageDetails[i].PackageHeight);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "US" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 166)) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 139)) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "IN" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(
                                parseFloat(parseFloat(Total) / parseFloat(2.2))
                              ) * Number(PackageDetails[i].PackageNumber);
                          }

                          if (Weight > Total) {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Weight);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Weight);
                          } else {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Total);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Total);
                          }

                          ChargableWeight.push(
                            PackageDetails[i].PackageChargableWeight.toString()
                          );

                          if (PackageDetails[i].PackageInsuredValue) {
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            PackageDetails[i].PackageInsuredValue = 0;
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            Chargable = Number(
                              PackageDetails[i].PackageChargableWeight
                            );
                          }

                          TotalInsuredValue =
                            Number(TotalInsuredValue) + Number(Insure);
                          TotalWeight = Number(TotalWeight) + Number(Weight);
                          TotalChargable =
                            Number(TotalChargable) + Number(Chargable);
                        }
                      }
                      console.log("TotalChargable = ", TotalChargable);
                      if (
                        TotalChargable < 50 &&
                        this.state.ThankyouPageMoveFromZip == false &&
                        this.state.ThankyouPageMoveToZip == false
                      ) {
                        console.log("IN Here");
                        var CurrDate = new Date();
                        var addDay = 0;

                        console.log("CurrDate.getDay() = ", CurrDate.getDay());
                        if (CurrDate.getDay() == 0) {
                          addDay = 2;
                        }
                        if (CurrDate.getDay() == 6) {
                          addDay = 3;
                        }

                        console.log("addDay = ", addDay);

                        var shipDateToSend = "";
                        if (addDay != 0) {
                          var shipDateToSend12 = CurrDate.setDate(
                            CurrDate.getDate() + addDay
                          );
                          shipDateToSend = new Date(
                            shipDateToSend12
                          ).toISOString();
                        } else {
                          shipDateToSend = new Date().toISOString();
                        }

                        console.log("DatestoSend555", this.state.packgedata);
                        var data = {
                          data: {
                            quoteData: {
                              PackageType: this.state.finalPackage,
                              WeightType: "LBS",
                              UpsData: {
                                FromCountry: JSON.stringify(
                                  filterFromCountryData[0]
                                ),
                                FromCity:
                                  this.state.FromCity === ""
                                    ? this.state.FromFedExSelectedCity.value
                                    : this.state.FromCity,
                                FromUPSCity: this.state.FromUPSSelectedCity,
                                FromFedExCity: this.state.FromFedExSelectedCity,
                                FromZipCode: this.state.FromZip,
                                FromStateProvinceCode: this.state.fromStateName,
                                ToCountry: JSON.stringify(
                                  filterToCountryData[0]
                                ),
                                ToCity:
                                  this.state.ToCity === ""
                                    ? this.state.ToFedExSelectedCity.value
                                    : this.state.ToCity,
                                ToUPSCity: null,
                                ToFedExCity: null,
                                ToZipCode: this.state.ToZip,
                                ToStateProvinceCode: "",
                              },

                              PackageNumber: this.state.packgedata.no_pack,
                              Weight: this.state.packgedata.weight,
                              DimeL: this.state.packgedata.len,
                              DimeW: this.state.packgedata.width,
                              DimeH: this.state.packgedata.height,
                              TotalLength: TotalLength,
                              TotalWidth: TotalWidth,
                              TotalInsuredValues: TotalInsuredValue,
                              TotalHeight: TotalHeight,
                              ChargableWeight: ChargableWeight,
                              InsuredValues: this.state.packgedata.insuredValue,

                              TotalWeight: TotalChargable,
                              IsPickUp: false,
                              WeightCount: this.state.packgedata.weight.length,
                              LengthCount: this.state.packgedata.len.length,
                              WidthCount: this.state.packgedata.width.length,
                              HeightCount: this.state.packgedata.height.length,
                              PackCount: this.state.packgedata.no_pack.length,
                              PackageDetailsCount:
                                this.state.packgedata.no_pack.length,
                              PackageDetailsText:
                                this.state.packgedata.no_pack.length,
                              EnvelopeWeightLBSText: TotalChargable
                                ? TotalChargable
                                : 0,
                              ShipDate: shipDateToSend,

                              PackageDetails: PackageDetails,
                              AgentCode: 1,
                            },
                          },
                        };
                        if (
                          this.state.IsResidential === true ||
                          this.state.IsResidential === 1
                        ) {
                          data.data.quoteData.IsResidencial = true;
                        } else {
                          data.data.quoteData.IsResidencial = false;
                        }
                        data.data.quoteData.PackageNumber = PackageNumber1;
                        data.data.quoteData.Weight = Weight1;
                        data.data.quoteData.DimeL = DimeL1;
                        data.data.quoteData.DimeW = DimeW1;
                        data.data.quoteData.DimeH = DimeH1;
                        data.data.quoteData.TotalLength = TotalLength1;
                        data.data.quoteData.TotalWidth = TotalWidth1;
                        data.data.quoteData.TotalInsuredValues =
                          TotalInsuredValues1;
                        data.data.quoteData.TotalHeight = TotalHeight1;
                        data.data.quoteData.ChargableWeight = ChargableWeight1;
                        data.data.quoteData.InsuredValues = InsuredValues1;
                        data.data.quoteData.WeightCount = Weight1.length;
                        data.data.quoteData.LengthCount = DimeL1.length;
                        data.data.quoteData.WidthCount = DimeW1.length;
                        data.data.quoteData.HeightCount = DimeH1.length;

                        data.data.quoteData.PackCount =
                          TotalPackageNumber1.toString();
                        data.data.quoteData.PackageDetailsCount =
                          TotalPackageNumber1;
                        data.data.quoteData.PackageDetailsText =
                          TotalPackageNumber1.toString();
                        let imgArray = [];

                        console.log("PackageType = ", AllPackegeValue[0]);
                        console.log(" data.data = ", data.data);
                        api.post("getQuote/GetRateImages").then((msg) => {
                          imgArray = msg.data[0];
                          {
                            this.state.FromSelectedCountry.label ===
                              "United States" ||
                            this.state.FromSelectedCountry.label === "Canada"
                              ? api
                                  .post("getQuote/getRates", data.data)
                                  .then((msg) => {
                                    if (!msg) {
                                      this.GetSuccessPage();
                                    }
                                    this.hideLoader();
                                    if (
                                      msg.data.length === 1 &&
                                      msg.data[0].Service_Type === "Fedex Error"
                                    ) {
                                      this.hideLoader();
                                      this.GetSuccessPage();
                                    } else {
                                      for (
                                        var i = 0;
                                        i < msg.data.length;
                                        i++
                                      ) {
                                        if (
                                          msg.data[i].MainServiceName == "" ||
                                          msg.data[i].MainServiceName ==
                                            undefined
                                        ) {
                                          if (
                                            msg.data[
                                              i
                                            ].ServiceDisplayName.includes(
                                              "FEDEX"
                                            )
                                          ) {
                                            msg.data[i].MainServiceName =
                                              "FedEx";
                                          }
                                        }
                                      }
                                      let contentText = "Boxes";
                                      if (
                                        this.state.packagetype == "Envelope"
                                      ) {
                                        contentText = "Envelop";
                                        TotalChargable = 0.5;
                                      }

                                      var arr1 = [];
                                      var arr2 = [];
                                      msg.data.forEach((obj) => {
                                        if (obj.IsError) {
                                          if (
                                            obj.Delivery_Date !==
                                            "Service was validated at the country level, but might not be valid for the actual intended city for the destination."
                                          ) {
                                            arr2.push(obj);
                                          }
                                        } else {
                                          if (
                                            obj.Delivery_Date !==
                                            "Service was validated at the country level, but might not be valid for the actual intended city for the destination."
                                          ) {
                                            arr1.push(obj);
                                          }
                                        }
                                      });
                                      var msg = [];
                                      msg.data = arr1.concat(arr2);

                                      for (
                                        var idx = 0;
                                        idx < msg.data.length;
                                        idx++
                                      ) {
                                        const element = msg.data[idx];
                                        let isError = element.IsError;

                                        let Baseurl = window.btoa(
                                          msg.data[idx].ServiceType +
                                            "/" +
                                            msg.data[idx].MainServiceName +
                                            "/" +
                                            msg.data[idx].ServiceDisplayName +
                                            "/" +
                                            msg.data[idx].Rates.toFixed(2) +
                                            ""
                                        );

                                        let imgUrl = imgArray.filter(
                                          (x) =>
                                            x.MainServiceName ===
                                            element.MainServiceName
                                        );

                                        if (
                                          msg.data[idx].MainServiceName ==
                                          "FedEx"
                                        ) {
                                          console.log(
                                            "msg.data[idx] = ",
                                            msg.data[idx].BaseP
                                          );

                                          var totalValue =
                                            ((msg.data[idx].BaseP -
                                              msg.data[idx].Rates) /
                                              msg.data[idx].BaseP) *
                                            100;
                                          totalValue = totalValue.toFixed(2);
                                          totalValue = Math.round(totalValue);

                                          element.discountPercentage =
                                            totalValue;
                                          console.log("Percent ", totalValue);
                                          msg.data[idx].Discounts =
                                            totalValue + "%";
                                        }

                                        msg.data[idx].urlIMG = imgUrl[0].IMGURL;
                                        let bookNowURL =
                                          bookurl +
                                          Baseurl +
                                          `?saleid=` +
                                          encodeURIComponent(salesLeadID);
                                        this.state.tempFinalImage.push(
                                          <div className="search-result-row">
                                            <div className="provide-img">
                                              <span>
                                                <img
                                                  src={imgUrl[0].IMGURL}
                                                ></img>
                                              </span>
                                            </div>
                                            <div className="provider-name">
                                              <h3>
                                                {element.ServiceDisplayName}
                                              </h3>
                                            </div>
                                            <div className="est-date">
                                              <span>Estimated Delivery</span>
                                              <p>{element.Delivery_Date}</p>
                                            </div>

                                            <div className="rates-discount">
                                              {element.MainServiceName ==
                                                "FedEx" &&
                                              element.BaseP > 0 &&
                                              element.BaseP > element.Rates ? (
                                                <div className="est-discount">
                                                  <span>
                                                    Save{" "}
                                                    {element.discountPercentage}
                                                    %
                                                  </span>
                                                  <p>{element.BaseP} retail</p>
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                            </div>

                                            <div className="quote-price">
                                              <h3>
                                                {element.Rates.toFixed(2)}
                                              </h3>
                                            </div>

                                            <div className="book-quote">
                                              {element.Delivery_Date !==
                                              "Invalid Destination Postal Code." ? (
                                                <a
                                                  href={bookNowURL}
                                                  className="next-btn"
                                                >
                                                  Book Now{" "}
                                                  <img
                                                    src={arrowRightWhite}
                                                    alt="Next"
                                                  />
                                                </a>
                                              ) : (
                                                <div className="Disablebook-quote a">
                                                  <a className="next-btn">
                                                    Book Now{" "}
                                                    <img
                                                      src={arrowRightWhite}
                                                      alt="Next"
                                                    />
                                                  </a>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      }
                                      this.setState({
                                        finalImage: this.state.tempFinalImage,
                                      });

                                      let LeadDetails = {
                                        FromCountryValue: this.state
                                          .SelectedOption
                                          ? this.state.SelectedOption
                                          : this.state.USSelectedOption,
                                        FromZipCode: this.state.FromZip,
                                        ToCountryValue: this.state
                                          .SelectedOptionTo
                                          ? this.state.SelectedOptionTo
                                          : this.state.ToSelectedCountry,

                                        FromCity:
                                          this.state.FromCity === ""
                                            ? this.state.FromFedExCityValue
                                                .label
                                            : this.state.FromCity,
                                        ToCity:
                                          this.state.ToCity === ""
                                            ? this.state.ToFedExCityValue.label
                                            : this.state.ToCity,

                                        Weight: data.data.quoteData.Weight,
                                        ChargableWeight:
                                          data.data.quoteData.ChargableWeight,
                                        ToZipCode: this.state.ToZip,
                                        PackageTypeValue:
                                          this.state.SelectedPakage,
                                        ContactName: this.state.ContactName,
                                        Email: this.state.email,
                                        PhoneNumber: this.state.PhoneNumber,
                                      };

                                      let mailData = {
                                        SalesLeadID: salesLeadID,
                                        ChargableWeight: ChargableWeight,
                                        RateData: msg.data,
                                        IsResidential: this.state.IsResidential,
                                        RateType: "Rates",
                                      };

                                      {
                                        BoxesStatusValue === "1" &&
                                        EnvelopStatusValue === undefined &&
                                        AutoStatusValue === undefined &&
                                        TelevisionStatusValue === undefined &&
                                        FurnitureStatusValue === undefined
                                          ? api
                                              .post(
                                                "salesLead/sendGetRateEmail",
                                                mailData
                                              )
                                              .then((mailres) => {
                                                console.log(
                                                  "msg.data",
                                                  msg.data
                                                );
                                                localStorage.removeItem(
                                                  "gerRates"
                                                );
                                                localStorage.setItem(
                                                  "gerRates",
                                                  JSON.stringify(msg.data)
                                                );
                                                localStorage.setItem(
                                                  "salesLeadID",
                                                  salesLeadID
                                                );
                                                localStorage.setItem(
                                                  "LeadDetails",
                                                  JSON.stringify(LeadDetails)
                                                );

                                                setTimeout(() => {
                                                  debugger;
                                                  console.log(
                                                    "chekkkkkkk",
                                                    BoxesStatusValue
                                                  );
                                                  this.CallGetRate();

                                                  this.hideLoader();
                                                });
                                              })
                                          : this.GetSuccessPage();
                                      }
                                    }
                                  })
                              : this.GetSuccessPage();
                          }
                        });
                      } else {
                        // console.log("Here Else");
                        this.GetSuccessPage();
                      }
                    });
                }, 5000);
              });
          }, 1000);
        }
      }
      // } else if (
      //   this.state.SelectedPakage === "furniture" ||
      //   this.state.SelectedPakage === "auto"
      // ) {
      //   document.getElementById("step3").className = "active";
      //   document.getElementById("step1").className = "";
      //   document.getElementById("step2").style.display = "none";
      //   this.setState({
      //     PackageStatus: "Active",
      //   });
    } else if (
      EnvelopStatusValue === "2" ||
      // this.state.SelectedPakage === "furniture" ||
      FurnitureStatusValue === "3"
    ) {
      document.getElementById("step3").className = "active";
      document.getElementById("step1").className = "";
      document.getElementById("step2").style.display = "none";
      this.setState({
        FirstStep: "Active",
      });
      this.setState({
        SetMultiStep: "Active",
      });
      if (!this.state.EnvelopStatus) {
        this.setState({
          ToStateCodeValueErr: "",
        });
      } else if (!this.state.FromZipCodeValue) {
        this.setState({
          FromZipCodeErrText: "Please enter from zip Code",
        });
      } else if (!this.state.SelectedOptionTo) {
        this.setState({
          ToStateCodeValueErr: "Please enter sending to",
        });
      } else if (!this.state.TozipCodeError) {
        this.setState({
          ToZipCodeEnterText: "Please enter to zip Code",
        });
      }
      if (this.state.FromZipCodeValue) {
        this.setState({
          FromZipCodeErrText: "",
        });
      }

      var element = "";
      element = document.getElementById("nave");
      // element.classList.remove("hidenave");
      element.classList.add("three-section");

      this.setState({
        EnvelopStatus: "Active",
      });

      // if (this.state.EnvelopStatus) {
      //   this.setState({
      //     ToStateCodeValueErr: "",
      //   });
      // } else if (!this.state.FromZipCodeValue) {
      //   this.setState({
      //     FromZipCodeErr: "Please enter from zip Code",
      //   });
      // }

      if (
        // this.state.SelectedOption &&
        // this.state.FromFedExCityValue &&
        // this.stete.FromZipCodeValue &&
        // this.stete.SelectedOptionTo &&
        // this.state.TozipCodeError &&
        (this.state.FromZipCodeValue || this.state.FromFedExCityValue?.label) &&
        (this.state.ToFedExCityValue?.label || this.state.TozipCodeError) &&
        (this.state.SelectedOptionTo || this.state.ToSelectedCountry)
      ) {
        if (this.state.EnvelopStatus === "Active") {
          debugger;
          document.getElementById("step4").className = "active";
          document.getElementById("step3").className = "";
          document.getElementById("step2").className = "";
          document.getElementById("step1").className = "";
          document.getElementById("shipperdetails").style.display = "none";
          document.getElementById("shipsmart").style.display = "block";

          this.setState({
            LocationStatus: "Active",
          });
          this.setState({
            FirstStep: "",
          });
          this.setState({
            SetMultiStep: "",
          });
        }

        if (
          this.state.LocationStatus === "Active" &&
          stepValidate === true &&
          allValid === true
        ) {
          var filterFromCountryData = this.state.CountryList.filter(
            (x) => x.CountryID == this.state.FromSelectedCountry.value
          );
          var filterToCountryData = this.state.CountryList.filter(
            (x) => x.CountryID == this.state.ToSelectedCountry.value
          );
          if (
            filterFromCountryData[0].CountryCode &&
            filterToCountryData[0].CountryCode
          ) {
          }

          var CurrDate = new Date();
          var addDay = 0;

          console.log("CurrDate.getDay() = ", CurrDate.getDay());
          if (CurrDate.getDay() == 0) {
            addDay = 2;
          }
          if (CurrDate.getDay() == 6) {
            addDay = 3;
          }

          var shipDateToSend = "";
          if (addDay != 0) {
            var shipDateToSend12 = CurrDate.setDate(
              CurrDate.getDate() + addDay
            );
            shipDateToSend = new Date(shipDateToSend12).toISOString();
          } else {
            shipDateToSend = new Date().toISOString();
          }

          var TotalChargable = 1;
          // -------if packagetype=== "envelope"-------------
          this.state.packgedata.no_pack.push(1);
          this.state.packgedata.weight.push(0.5);
          this.state.packgedata.len.push(10);
          this.state.packgedata.width.push(13);
          this.state.packgedata.height.push(1);
          this.state.packgedata.chargableWeight.push(1);
          this.state.packgedata.insuredValue.push(0);
          var data = {
            quoteData: {
              PackageType: this.state.finalPackage,
              WeightType: "LBS",
              UpsData: {
                FromCountry: JSON.stringify(filterFromCountryData[0]),
                FromCity:
                  this.state.FromCity === ""
                    ? this.state.FromFedExCityValue.label
                    : this.state.FromCity,
                FromUPSCity: this.state.FromUPSSelectedCity,
                FromFedExCity: this.state.FromFedExSelectedCity,
                FromZipCode: this.state.FromZip,
                FromStateProvinceCode: this.state.fromStateName,
                ToCountry: JSON.stringify(filterToCountryData[0]),
                ToCity:
                  this.state.ToCity === ""
                    ? this.state.ToFedExCityValue.label
                    : this.state.ToCity,
                ToUPSCity: null,
                ToFedExCity: null,
                ToZipCode: this.state.ToZip,
                ToStateProvinceCode: "",
              },
              PackageNumber: this.state.packgedata.no_pack,
              Weight: this.state.packgedata.weight,
              DimeL: this.state.packgedata.len,
              DimeW: this.state.packgedata.width,
              DimeH: this.state.packgedata.height,
              TotalLength: 10,
              TotalWidth: 13,
              TotalInsuredValues: 0,
              InsuredValues: this.state.packgedata.insuredValue,
              TotalHeight: 1,
              ChargableWeight: this.state.packgedata.chargableWeight,
              InsuredValues: ["0"],
              TotalWeight: 1,
              IsPickUp: false,
              WeightCount: this.state.packgedata.weight.length,
              LengthCount: this.state.packgedata.len.length,
              WidthCount: this.state.packgedata.width.length,
              HeightCount: this.state.packgedata.height.length,
              PackCount: this.state.packgedata.no_pack.length,
              PackageDetailsCount: this.state.packgedata.no_pack.length,
              PackageDetailsText: this.state.packgedata.no_pack.length,
              EnvelopeWeightLBSText: TotalChargable ? TotalChargable : 0,
              ShipDate: shipDateToSend,
              PackageDetails: AllPackegeValue,

              // this.state.SelectedPakage === "envelope" ||
              // this.state.SelectedPakage === "furniture"
              // AllfurnitureValue
              AgentCode: 1,
              IsResidencial: true,
            },
          };

          var manageData = {};
          {
            this.state.PersonID
              ? (manageData = {
                  Email: this.state.email,
                  Phone: this.state.PhoneNumber,
                  PersonID: this.state.PersonID,
                  newpackagetype: "Document",
                })
              : (manageData = {
                  Email: this.state.email,
                  Phone: this.state.PhoneNumber,
                  PersonID: 0,
                  newpackagetype: "Document",
                });
          }
          var EvnFur = [
            {
              PackageType: "2",
              ActualWeight: 0.5,
              DimensionL: 10,
              DimensionW: 13,
              DimensionH: 1,
              ChargeableWeight: 1,
              Status: "Active",
              Quantity: 1,
            },
          ];

          this.showLoader();
          api
            .post("salesLead/getManagedByPhoneOREmail", manageData)
            .then((res) => {
              console.log("contactinfOo", res);
              if (res.data.length > 0) {
                var ManagedBY = res.data[0].ManagedBy;
                var counterData = {
                  PersonID: res.data[0].ManagedBy,
                };
                api
                  .post("userManagement/updateLeadCounter", counterData)
                  .then((counterDatares) => {});

                api.post("/getQuote/getRates", data).then((res) => {});
                var salesLeadData = {
                  urlredirect_path: this.state.page_redirectionPath,
                  userid: 1,
                  SalesLeadManagementID: null,
                  ManagedBy: ManagedBY,
                  SalesLeadsType: null,
                  ContactName: this.state.ContactName,
                  CompanyName: "",
                  Email: this.state.email,
                  PhoneNumber: this.state.PhoneNumber,
                  FromState: this.state.FromState,
                  FromCity:
                    this.state.FromCity === ""
                      ? this.state.FromFedExCityValue.label
                      : this.state.FromCity,
                  ToCity:
                    this.state.ToCity === ""
                      ? this.state.ToFedExCityValue.label
                      : this.state.ToCity,
                  FromZipCode: this.state.FromZip,
                  ToZipCode: this.state.ToZip,
                  FromCountryID: this.state.FromSelectedCountry.value,
                  ToState: this.state.ToState,
                  ToCountryID: this.state.ToSelectedCountry.value,
                  SalesLeadDate: null,
                  SalesLeadFollowupDate: null,
                  TentativeMoveDate: null,
                  ReferredBy: "",
                  IPAddress: null,
                  MACAddress: null,
                  DeliveryType:
                    this.state.IsResidential == 1
                      ? "Residential"
                      : "Commercial",
                  ProposalStatus: "New",
                  // PackageList: this.state.allpackagesValue,
                  PackageList: AllPackegeValue,

                  CarList: [],
                  NoteList: null,
                  WeightType: null,
                };
                setTimeout(() => {
                  api
                    .post("salesLead/addSalesLead", salesLeadData)
                    .then((saleres) => {
                      if (
                        this.state.FromSelectedCountry.value ===
                        this.state.ToSelectedCountry.value
                      ) {
                        this.GetSuccessPage();
                      }
                      if (this.state.CheckZipCode === "ZERO_RESULTS") {
                        this.GetSuccessPage();
                      }
                      if (
                        this.state.FromSelectedCountry.label === "United States"
                      ) {
                      }
                      console.log("salesLeadData = 12", salesLeadData);

                      var salesLeadID = saleres.data;
                      var TotalLength = 0;
                      var TotalWidth = 0;
                      var TotalHeight = 0;
                      var PackageDetails = [];
                      for (
                        var i = 0;
                        i < this.state.packgedata.no_pack.length;
                        i++
                      ) {
                        TotalLength += Number(this.state.packgedata.len[i]);
                        TotalWidth += Number(this.state.packgedata.width[i]);
                        TotalHeight += Number(this.state.packgedata.height[i]);
                        var packageOBJ = {
                          PackageNumber: this.state.packgedata.no_pack[i],
                          PackageWeight: this.state.packgedata.weight[i],
                          PackageWidth: this.state.packgedata.width[i],
                          PackageLength: this.state.packgedata.len[i],
                          PackageHeight: this.state.packgedata.height[i],
                          PackageChargableWeight: 0,
                          PackageInsuredValue: 0,
                        };
                        PackageDetails.push(packageOBJ);
                      }
                      var TotalChargeWeight = 0;
                      var TotalInsuredValue = 0;
                      var TotalWeight = 0;
                      var TotalChargable = 0;
                      var ChargableWeight = [];
                      var filterFromCountryData = this.state.CountryList.filter(
                        (x) =>
                          x.CountryID == this.state.FromSelectedCountry.value
                      );
                      var filterToCountryData = this.state.CountryList.filter(
                        (x) => x.CountryID == this.state.ToSelectedCountry.value
                      );
                      if (
                        filterFromCountryData[0].CountryCode &&
                        filterToCountryData[0].CountryCode
                      ) {
                        for (var i = 0; i < PackageDetails.length; i++) {
                          var WE = 0;
                          var LE = 0;
                          var HE = 0;
                          var Insure = 0;
                          var Total = 0;
                          var Weight = 0;
                          var Chargable = 0;
                          if (PackageDetails[i].PackageWeight) {
                            Weight =
                              Number(PackageDetails[i].PackageWeight) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageWidth) {
                            WE = Number(PackageDetails[i].PackageWidth);
                          }

                          if (PackageDetails[i].PackageLength) {
                            LE = Number(PackageDetails[i].PackageLength);
                          }

                          if (PackageDetails[i].PackageHeight) {
                            HE = Number(PackageDetails[i].PackageHeight);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "US" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 166)) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 139)) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "IN" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(
                                parseFloat(parseFloat(Total) / parseFloat(2.2))
                              ) * Number(PackageDetails[i].PackageNumber);
                          }

                          if (Weight > Total) {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Weight);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Weight);
                          } else {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Total);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Total);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            ChargableWeight.push(
                              PackageDetails[
                                i
                              ].PackageChargableWeight.toString()
                            );
                          }

                          if (PackageDetails[i].PackageInsuredValue) {
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            PackageDetails[i].PackageInsuredValue = 0;
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            Chargable = Number(
                              PackageDetails[i].PackageChargableWeight
                            );
                          }

                          TotalInsuredValue =
                            Number(TotalInsuredValue) + Number(Insure);
                          TotalWeight = Number(TotalWeight) + Number(Weight);
                          TotalChargable =
                            Number(TotalChargable) + Number(Chargable);
                        }
                      }
                      var PackageNumber1 = [];
                      var Weight1 = [];
                      var DimeL1 = [];
                      var DimeW1 = [];
                      var DimeH1 = [];
                      var ChargableWeight1 = [];
                      var InsuredValues1 = [];

                      var PackagedetailsFinalValues = [];

                      var TotalPackageNumber1 = 0;
                      var TotalLength1 = 0;
                      var TotalWidth1 = 0;
                      var TotalHeight1 = 0;
                      var TotalInsuredValues1 = 0;
                      for (var i = 0; i < PackageDetails.length; i++) {
                        if (PackageDetails[i].PackageNumber) {
                          TotalPackageNumber1 =
                            Number(TotalPackageNumber1) +
                            parseInt(PackageDetails[i].PackageNumber);
                          PackageNumber1.push(
                            PackageDetails[i].PackageNumber.toString()
                          );
                        } else {
                          PackageDetails[i].PackageNumber = "1";
                          TotalPackageNumber1 =
                            Number(TotalPackageNumber1) +
                            parseInt(PackageDetails[i].PackageNumber);
                          PackageNumber1.push(
                            PackageDetails[i].PackageNumber.toString()
                          );
                        }
                        Weight1.push(
                          PackageDetails[i].PackageWeight.toString()
                        );

                        if (PackageDetails[i].PackageLength.toString()) {
                          DimeL1.push(
                            PackageDetails[i].PackageLength.toString()
                          );
                        } else {
                          PackageDetails[i].PackageLength = "1";
                          DimeL1.push(
                            PackageDetails[i].PackageLength.toString()
                          );
                        }

                        if (PackageDetails[i].PackageWidth) {
                          DimeW1.push(
                            PackageDetails[i].PackageWidth.toString()
                          );
                        } else {
                          PackageDetails[i].PackageWidth = "1";
                          DimeW1.push(
                            PackageDetails[i].PackageWidth.toString()
                          );
                        }

                        if (PackageDetails[i].PackageHeight) {
                          DimeH1.push(
                            PackageDetails[i].PackageHeight.toString()
                          );
                        } else {
                          PackageDetails[i].PackageHeight = "1";
                          DimeH1.push(
                            PackageDetails[i].PackageHeight.toString()
                          );
                        }

                        if (PackageDetails[i].PackageChargableWeight) {
                          ChargableWeight1.push(
                            PackageDetails[i].PackageChargableWeight.toString()
                          );
                        }

                        if (PackageDetails[i].PackageInsuredValue) {
                          InsuredValues1.push(
                            PackageDetails[i].PackageInsuredValue.toString()
                          );
                        } else {
                          PackageDetails[i].PackageInsuredValue = "0";
                          InsuredValues1.push(
                            PackageDetails[i].PackageInsuredValue.toString()
                          );
                        }
                        TotalLength1 += parseInt(
                          PackageDetails[i].PackageLength
                        );
                        TotalWidth1 += parseInt(PackageDetails[i].PackageWidth);
                        TotalHeight1 += parseInt(
                          PackageDetails[i].PackageHeight
                        );
                        TotalInsuredValues1 += parseInt(
                          PackageDetails[i].PackageInsuredValue
                        );
                      }

                      TotalChargeWeight = 0;
                      TotalInsuredValue = 0;
                      TotalWeight = 0;
                      TotalChargable = 0;
                      ChargableWeight = [];
                      if (
                        filterFromCountryData[0].CountryCode &&
                        filterToCountryData[0].CountryCode
                      ) {
                        for (var i = 0; i < PackageDetails.length; i++) {
                          var WE = 0;
                          var LE = 0;
                          var HE = 0;
                          var Insure = 0;
                          var Total = 0;
                          var Weight = 0;
                          var Chargable = 0;
                          if (PackageDetails[i].PackageWeight) {
                            Weight =
                              Number(PackageDetails[i].PackageWeight) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageWidth) {
                            WE = Number(PackageDetails[i].PackageWidth);
                          }

                          if (PackageDetails[i].PackageLength) {
                            LE = Number(PackageDetails[i].PackageLength);
                          }

                          if (PackageDetails[i].PackageHeight) {
                            HE = Number(PackageDetails[i].PackageHeight);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "US" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 166)) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 139)) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "IN" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(
                                parseFloat(parseFloat(Total) / parseFloat(2.2))
                              ) * Number(PackageDetails[i].PackageNumber);
                          }

                          if (Weight > Total) {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Weight);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Weight);
                          } else {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Total);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Total);
                          }

                          ChargableWeight.push(
                            PackageDetails[i].PackageChargableWeight.toString()
                          );

                          if (PackageDetails[i].PackageInsuredValue) {
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            PackageDetails[i].PackageInsuredValue = 0;
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            Chargable = Number(
                              PackageDetails[i].PackageChargableWeight
                            );
                          }

                          TotalInsuredValue =
                            Number(TotalInsuredValue) + Number(Insure);
                          TotalWeight = Number(TotalWeight) + Number(Weight);
                          TotalChargable =
                            Number(TotalChargable) + Number(Chargable);
                        }
                      }
                      if (
                        TotalChargable < 50 &&
                        this.state.ThankyouPageMoveFromZip == false &&
                        this.state.ThankyouPageMoveToZip == false
                      ) {
                        var CurrDate = new Date();
                        var addDay = 0;

                        console.log("CurrDate.getDay() = ", CurrDate.getDay());
                        if (CurrDate.getDay() == 0) {
                          addDay = 2;
                        }
                        if (CurrDate.getDay() == 6) {
                          addDay = 3;
                        }

                        console.log("addDay = ", addDay);

                        var shipDateToSend = "";
                        if (addDay != 0) {
                          var shipDateToSend12 = CurrDate.setDate(
                            CurrDate.getDate() + addDay
                          );
                          shipDateToSend = new Date(
                            shipDateToSend12
                          ).toISOString();
                        } else {
                          shipDateToSend = new Date().toISOString();
                        }

                        console.log("DatestoSend = ", shipDateToSend);
                        var data = {
                          data: {
                            quoteData: {
                              PackageType: this.state.finalPackage,
                              WeightType: "LBS",
                              UpsData: {
                                FromCountry: JSON.stringify(
                                  filterFromCountryData[0]
                                ),
                                FromCity:
                                  this.state.FromCity === ""
                                    ? this.state.FromFedExSelectedCity.value
                                    : this.state.FromCity,
                                FromUPSCity: this.state.FromUPSSelectedCity,
                                FromFedExCity: this.state.FromFedExSelectedCity,
                                FromZipCode: this.state.FromZip,
                                FromStateProvinceCode: this.state.fromStateName,
                                ToCountry: JSON.stringify(
                                  filterToCountryData[0]
                                ),
                                ToCity:
                                  this.state.ToCity === ""
                                    ? this.state.ToFedExSelectedCity.value
                                    : this.state.ToCity,
                                ToUPSCity: null,
                                ToFedExCity: null,
                                ToZipCode: this.state.ToZip,
                                ToStateProvinceCode: "",
                              },

                              PackageNumber: this.state.packgedata.no_pack,
                              Weight: this.state.packgedata.weight,
                              DimeL: this.state.packgedata.len,
                              DimeW: this.state.packgedata.width,
                              DimeH: this.state.packgedata.height,
                              TotalLength: TotalLength,
                              TotalWidth: TotalWidth,
                              TotalInsuredValues: TotalInsuredValue,
                              TotalHeight: TotalHeight,
                              ChargableWeight: ChargableWeight,
                              InsuredValues: this.state.packgedata.insuredValue,

                              TotalWeight: TotalChargable,
                              IsPickUp: false,
                              WeightCount: this.state.packgedata.weight.length,
                              LengthCount: this.state.packgedata.len.length,
                              WidthCount: this.state.packgedata.width.length,
                              HeightCount: this.state.packgedata.height.length,
                              PackCount: this.state.packgedata.no_pack.length,
                              PackageDetailsCount:
                                this.state.packgedata.no_pack.length,
                              PackageDetailsText:
                                this.state.packgedata.no_pack.length,
                              EnvelopeWeightLBSText: TotalChargable
                                ? TotalChargable
                                : 0,
                              ShipDate: shipDateToSend,

                              PackageDetails: PackageDetails,
                              AgentCode: 1,
                            },
                          },
                        };
                        if (
                          this.state.IsResidential === true ||
                          this.state.IsResidential === 1
                        ) {
                          data.data.quoteData.IsResidencial = true;
                        } else {
                          data.data.quoteData.IsResidencial = false;
                        }
                        data.data.quoteData.PackageNumber = PackageNumber1;
                        data.data.quoteData.Weight = Weight1;
                        data.data.quoteData.DimeL = DimeL1;
                        data.data.quoteData.DimeW = DimeW1;
                        data.data.quoteData.DimeH = DimeH1;
                        data.data.quoteData.TotalLength = TotalLength1;
                        data.data.quoteData.TotalWidth = TotalWidth1;
                        data.data.quoteData.TotalInsuredValues =
                          TotalInsuredValues1;
                        data.data.quoteData.TotalHeight = TotalHeight1;
                        data.data.quoteData.ChargableWeight = ChargableWeight1;
                        data.data.quoteData.InsuredValues = InsuredValues1;
                        data.data.quoteData.WeightCount = Weight1.length;
                        data.data.quoteData.LengthCount = DimeL1.length;
                        data.data.quoteData.WidthCount = DimeW1.length;
                        data.data.quoteData.HeightCount = DimeH1.length;

                        data.data.quoteData.PackCount =
                          TotalPackageNumber1.toString();
                        data.data.quoteData.PackageDetailsCount =
                          TotalPackageNumber1;
                        data.data.quoteData.PackageDetailsText =
                          TotalPackageNumber1.toString();
                        let imgArray = [];

                        console.log("PackageType = ", this.state.packagetype);
                        console.log(" data.data = ", data.data);

                        {
                          this.state.FromSelectedCountry.label ===
                            "United States" ||
                          this.state.FromSelectedCountry.label === "Canada"
                            ? api.post("getQuote/GetRateImages").then((msg) => {
                                imgArray = msg.data[0];

                                api
                                  .post("getQuote/getRates", data.data)
                                  .then((msg) => {
                                    this.hideLoader();

                                    if (
                                      msg.data.length === 1 &&
                                      msg.data[0].Service_Type === "Fedex Error"
                                    ) {
                                      this.hideLoader();
                                      this.GetSuccessPage();
                                    } else {
                                      for (
                                        var i = 0;
                                        i < msg.data.length;
                                        i++
                                      ) {
                                        if (
                                          msg.data[i].MainServiceName == "" ||
                                          msg.data[i].MainServiceName ==
                                            undefined
                                        ) {
                                          if (
                                            msg.data[
                                              i
                                            ].ServiceDisplayName.includes(
                                              "FEDEX"
                                            )
                                          ) {
                                            msg.data[i].MainServiceName =
                                              "FedEx";
                                          }
                                        }
                                      }
                                      let contentText = "Boxes";
                                      if (
                                        this.state.packagetype == "Envelope"
                                      ) {
                                        contentText = "Envelop";
                                        TotalChargable = 0.5;
                                      }

                                      var arr1 = [];
                                      var arr2 = [];
                                      msg.data.forEach((obj) => {
                                        if (obj.IsError) {
                                          if (
                                            obj.Delivery_Date !==
                                            "Service was validated at the country level, but might not be valid for the actual intended city for the destination."
                                          ) {
                                            arr2.push(obj);
                                          }
                                        } else {
                                          if (
                                            obj.Delivery_Date !==
                                            "Service was validated at the country level, but might not be valid for the actual intended city for the destination."
                                          ) {
                                            arr1.push(obj);
                                          }
                                        }
                                      });
                                      var msg = [];
                                      msg.data = arr1.concat(arr2);

                                      for (
                                        var idx = 0;
                                        idx < msg.data.length;
                                        idx++
                                      ) {
                                        const element = msg.data[idx];
                                        let isError = element.IsError;

                                        let Baseurl = window.btoa(
                                          msg.data[idx].ServiceType +
                                            "/" +
                                            msg.data[idx].MainServiceName +
                                            "/" +
                                            msg.data[idx].ServiceDisplayName +
                                            "/" +
                                            msg.data[idx].Rates.toFixed(2) +
                                            ""
                                        );

                                        let imgUrl = imgArray.filter(
                                          (x) =>
                                            x.MainServiceName ===
                                            element.MainServiceName
                                        );

                                        if (
                                          msg.data[idx].MainServiceName ==
                                          "FedEx"
                                        ) {
                                          console.log(
                                            "msg.data[idx] = ",
                                            msg.data[idx].BaseP
                                          );

                                          var totalValue =
                                            ((msg.data[idx].BaseP -
                                              msg.data[idx].Rates) /
                                              msg.data[idx].BaseP) *
                                            100;
                                          totalValue = totalValue.toFixed(2);
                                          totalValue = Math.round(totalValue);

                                          element.discountPercentage =
                                            totalValue;
                                          console.log("Percent ", totalValue);
                                          msg.data[idx].Discounts =
                                            totalValue + "%";
                                        }

                                        msg.data[idx].urlIMG = imgUrl[0].IMGURL;
                                        let bookNowURL =
                                          bookurl +
                                          Baseurl +
                                          `?saleid=` +
                                          encodeURIComponent(salesLeadID);
                                        this.state.tempFinalImage.push(
                                          <div className="search-result-row">
                                            <div className="provide-img">
                                              <span>
                                                <img
                                                  src={imgUrl[0].IMGURL}
                                                ></img>
                                              </span>
                                            </div>
                                            <div className="provider-name">
                                              <h3>
                                                {element.ServiceDisplayName}
                                              </h3>
                                            </div>
                                            <div className="est-date">
                                              <span>Estimated Delivery</span>
                                              <p>{element.Delivery_Date}</p>
                                            </div>

                                            <div className="rates-discount">
                                              {element.MainServiceName ==
                                                "FedEx" &&
                                              element.BaseP > 0 &&
                                              element.BaseP > element.Rates ? (
                                                <div className="est-discount">
                                                  <span>
                                                    Save{" "}
                                                    {element.discountPercentage}
                                                    %
                                                  </span>
                                                  <p>{element.BaseP} retail</p>
                                                </div>
                                              ) : (
                                                ""
                                              )}
                                            </div>

                                            <div className="quote-price">
                                              <h3>
                                                {element.Rates.toFixed(2)}
                                              </h3>
                                            </div>

                                            <div className="book-quote">
                                              {element.Delivery_Date !==
                                              "Invalid Destination Postal Code." ? (
                                                <a
                                                  href={bookNowURL}
                                                  className="next-btn"
                                                >
                                                  Book Now{" "}
                                                  <img
                                                    src={arrowRightWhite}
                                                    alt="Next"
                                                  />
                                                </a>
                                              ) : (
                                                <div className="Disablebook-quote a">
                                                  <a className="next-btn">
                                                    Book Now{" "}
                                                    <img
                                                      src={arrowRightWhite}
                                                      alt="Next"
                                                    />
                                                  </a>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      }
                                      this.setState({
                                        finalImage: this.state.tempFinalImage,
                                      });

                                      let LeadDetails = {
                                        FromCountryValue: this.state
                                          .SelectedOption
                                          ? this.state.SelectedOption
                                          : this.state.USSelectedOption,
                                        FromZipCode: this.state.FromZip,
                                        ToCountryValue: this.state
                                          .SelectedOptionTo
                                          ? this.state.SelectedOptionTo
                                          : this.state.ToSelectedCountry,
                                        Weight: data.data.quoteData.Weight,
                                        ChargableWeight:
                                          data.data.quoteData.ChargableWeight,

                                        FromCity:
                                          this.state.FromCity === ""
                                            ? this.state.FromFedExCityValue
                                                .label
                                            : this.state.FromCity,
                                        ToCity:
                                          this.state.ToCity === ""
                                            ? this.state.ToFedExCityValue.label
                                            : this.state.ToCity,
                                        ToZipCode: this.state.ToZip,
                                        PackageTypeValue:
                                          this.state.SelectedPakage,
                                        ContactName: this.state.ContactName,
                                        Email: this.state.email,
                                        PhoneNumber: this.state.PhoneNumber,
                                      };

                                      let mailData = {
                                        SalesLeadID: salesLeadID,
                                        ChargableWeight: ChargableWeight,
                                        RateData: msg.data,
                                        IsResidential: this.state.IsResidential,
                                        RateType: "Rates",
                                      };

                                      {
                                        EnvelopStatusValue === "2" &&
                                        BoxesStatusValue === undefined &&
                                        AutoStatusValue === undefined &&
                                        TelevisionStatusValue === undefined &&
                                        FurnitureStatusValue === undefined
                                          ? api
                                              .post(
                                                "salesLead/sendGetRateEmail",
                                                mailData
                                              )
                                              .then((mailres) => {
                                                console.log(
                                                  "msg.data",
                                                  msg.data
                                                );
                                                localStorage.removeItem(
                                                  "gerRates"
                                                );
                                                localStorage.setItem(
                                                  "gerRates",
                                                  JSON.stringify(msg.data)
                                                );
                                                localStorage.setItem(
                                                  "salesLeadID",
                                                  salesLeadID
                                                );
                                                localStorage.setItem(
                                                  "LeadDetails",
                                                  JSON.stringify(LeadDetails)
                                                );

                                                console.log(
                                                  "checkdataaaaafff",
                                                  EnvelopStatusValue
                                                );
                                                setTimeout(() => {
                                                  this.CallGetRate();

                                                  this.hideLoader();
                                                });
                                              })
                                          : this.GetSuccessPage();
                                      }
                                    }
                                  });
                              })
                            : this.GetSuccessPage();
                        }
                      }
                    });
                }, 5000);
              }
            });
        }
      }
    } else if (FurnitureStatusValue === "3") {
      document.getElementById("step3").className = "active";
      document.getElementById("step1").className = "";
      this.setState({
        PackageStatus: "Active",
      });
    } else if (AutoStatusValue === "5") {
      document.getElementById("step2").className = "active";
      document.getElementById("step1").className = "";
      this.setState({
        PackageStatus: "Active",
      });
    } else if (TelevisionStatusValue === "4") {
      document.getElementById("step2").className = "active";
      document.getElementById("step1").className = "";
      this.setState({
        PackageStatus: "Active",
      });
    }

    if (!this.state.ContactStatus) {
      this.setState({
        FromZipCodeErr: "",
      });
    } else if (!this.state.FromZipCodeValue) {
      this.setState({
        FromZipCodeErrText: "Please enter From Zip Code",
        // FromZipCodeErr: "Please enter from zip Code3",
      });
    } else if (!this.state.SelectedOptionTo) {
      this.setState({
        ToStateCodeValueErr: "Please enter sending to",
      });
    } else if (!this.state.TozipCodeError) {
      this.setState({
        ToZipCodeEnterText: "Please enter sending to zip code",
      });
    }

    if (!this.state.ContactStatus) {
      this.setState({
        FromZipCodeErr: "",
      });
    } else if (this.state.FromZipCodeValue) {
      this.setState({
        FromZipCodeErrText: "",
      });
    }

    if (!this.state.SelectedOption) {
      this.setState({
        FromFedExCityValueErr: "",
      });
    } else if (!this.state.FromFedExCityValue?.label) {
      this.setState({
        FromFedExCityValueErr: "Please select from city",
      });
    } else if (this.state.FromFedExCityValue?.label) {
      this.setState({
        FromFedExCityValueErr: "",
      });
    }

    if (!this.state.SelectedOptionTo) {
      this.setState({
        ToZipCodeValueErr: "",
      });
    } else if (!this.state.ToFedExCityValue?.label) {
      this.setState({
        ToZipCodeValueErr: "Please select to city",
      });
    } else if (this.state.ToFedExCityValue?.label) {
      this.setState({
        ToZipCodeValueErr: "",
      });
    }

    console.log("FromFedExCityValueErr", this.state.FromFedExCityValue?.label);
    console.log("FromFedExCityValueErr1", this.state.FromFedExCityValue[0]);

    if (
      (this.state.FromZipCodeValue || this.state.FromFedExCityValue?.label) &&
      (this.state.ToFedExCityValue?.label || this.state.TozipCodeError) &&
      (this.state.SelectedOptionTo || this.state.ToSelectedCountry)
    ) {
      if (this.state.ContactStatus === "Active") {
        debugger;
        document.getElementById("step4").className = "active";
        document.getElementById("step3").className = "";
        document.getElementById("step2").className = "";
        document.getElementById("step1").className = "";
        document.getElementById("shipsmart").style.display = "block";
        document.getElementById("shipperdetails").style.display = "none";
        this.setState({
          LastStatus: "Active",
        });
        this.setState({
          ContactValidation: "",
        });
      }
    }
  };

  getNumberofBox = () => {
    var noOfBox = [];
    for (var i = 1; i <= 25; i++) {
      noOfBox.push(i);
      // this.setState({
      //   noOfBoxinPackeges: noOfBox,
      // });
    }
    return noOfBox.map((x) => {
      return <option>{x}</option>;
    });
  };

  packageDetailsChange = (e, value, type) => {
    debugger;
    this.setState({
      PackageDetailsErr: false,
      PackageDetailsErrText: "",
    });
    if (type === "envelope") {
      this.setState({ packagetype: "Envelope" });
    } else {
      this.setState({ packagetype: "Package" });
    }
    var elements = document.getElementById(type);

    if (elements.classList.contains("active")) {
      console.log("In this");
      elements.classList.remove("active");
      var index = this.state.documentData.indexOf(value);
      if (index != -1) {
        this.state.documentData.splice(index, 1);
      }
      if (type == "box") {
        this.setState({ showBoxDetails: false });
      } else if (type == "television") {
        this.setState({ showTVDetails: false });
      } else if (type == "auto") {
        this.setState({ showCarDetails: false });
      }
    } else {
      elements.classList.add("active");
      this.state.documentData.push(value);

      if (type == "box") {
        this.setState({ showBoxDetails: true });
      } else if (type == "television") {
        this.setState({ showTVDetails: true });
      } else if (type == "auto") {
        this.setState({ showCarDetails: true });
      }
    }
    // ============= CHECK WHETHER 2ND STEP TO BE SHOWED OR NOT ===============
    if (this.state.documentData.length != 0) {
      if (
        this.state.documentData.length == 1 &&
        this.state.documentData.includes("2")
      ) {
        if (this.state.Steps[1].stepId == "containerdetails") {
          this.state.Steps.splice(1, 1);
        }
      } else {
        if (this.state.documentData.includes("3")) {
          // FOR FURNITURE
          // if (this.state.Steps[1].stepId == "containerdetails") {
          //   this.state.Steps.splice(1, 1);
          // }
        } else {
          // if (this.state.Steps[1].stepId != "containerdetails") {
          //   this.state.Steps.splice(1, 0, {
          //     stepName: "CONTAINER DETAILS",
          //     stepId: "containerdetails",
          //     classname: "inactive",
          //   });
          // }
        }
      }
    }
  };

  renderCountryOptions() {
    return this.state.CountryList.map((value) => {
      return <option value={value.CountryID}>{value.CountryName}</option>;
    });
  }

  handleFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return this.state.CountryList;
      }
      const updatedItems = this.state.CountryList.map((list) => {
        const newItems = list.CountryName.filter((item) => {
          return item.CountryName.toLowerCase().startsWith(
            searchValue.toLowerCase()
          );
        });
        return { ...list, CountryName: newItems };
      });
      return updatedItems;
    };
  };

  // ChangeFromCity(e, event, value) {
  //   this.setState({ FromFedExCityValue: e });
  // }

  // ChangeToCity(e) {
  //   this.setState({ ToFedExCityValue: e });
  // }

  handleSelect(e, type) {
    // this.setState({ SelectedOption: e });
    console.log("dattacheckselectedN", e.value);
    if (type === "from") {
      this.setState({ SelectedOption: e });
      this.setState({ FromIsFedxCity: 0, FromSelectedCountry: {} });
      let CountryId = e.value;
      let forzip = _.findIndex(this.state.CountryList, function (country) {
        return country.CountryID == CountryId;
      });
      let zip = this.state.CountryList[forzip];
      if (zip.CountryName !== "United States" && zip.IsFedexCity === 1) {
        this.setState({ FromIsFedxCity: 1 });
        this.getCityList(zip.CountryID, "from");
      } else if (zip.CountryName === "China") {
        this.getCityList(zip.CountryID, "from");
      }
      var FromSelectedCountry = {
        value: zip.CountryID,
        label: zip.CountryName,
      };

      this.setState({ FromSelectedCountry: FromSelectedCountry });
      this.setState({ FromZip: "", FromCity: "", FromFedExSelectedCity: "" });
      document.getElementById("fromzipSelect").value = "";
    } else if (type === "to") {
      this.setState({ SelectedOptionTo: e, ToStateCodeValueErr: "" });
      this.setState({ ToIsFedxCity: 0, ToSelectedCountry: {} });
      let CountryId = e.value;
      let forzip = _.findIndex(this.state.CountryList, function (country) {
        return country.CountryID == CountryId;
      });
      let zip = this.state.CountryList[forzip];
      if (zip.CountryName !== "United States" && zip.IsFedexCity === 1) {
        this.setState({ ToIsFedxCity: 1 });
        this.getCityList(zip.CountryID, "to");
      } else if (zip.CountryName === "China") {
        this.getCityList(zip.CountryID, "to");
      } else {
        this.setState({ hidetozipcode: true });
      }
      var ToSelectedCountry = {
        value: zip.CountryID,
        label: zip.CountryName,
      };
      this.setState({ ToSelectedCountry: ToSelectedCountry });
      this.setState({ ToZip: "", ToCity: "", ToFedExSelectedCity: "" });
      // document.getElementById("TozipSelect").value = "";
    }
  }

  async GetCountry() {
    try {
      await api
        .get("location/getCountryList")
        .then((res) => {
          if (res.success) {
            var Country = res.data;
            this.state.tempCountryList.push(res.data);
            this.setState({ CountryList: Country });

            // --------------checkdata-----------this.state.CountryList
            let mainCountryList = [];
            for (var i = 0; i < Country?.length; i++) {
              let mainCountryObject = {};
              mainCountryObject.label = Country[i]?.CountryName;
              mainCountryObject.value = Country[i]?.CountryID;
              mainCountryList.push(mainCountryObject);
              console.log("checkdatttttab", mainCountryList);
              this.setState({ CountryListValue: mainCountryList });
              // mainSubjectListObject.value = SubjectId[i]?.PersonID;
              // mainCountryList.push(mainSubjectListObject);
            }
            // --------------checkdata-----------------
            document.getElementById("fromCountrySelect").value = 202;
            this.setState({
              newcountryid: document.getElementById("fromCountrySelect").value,
            });

            var selectedCountryList = _.filter(Country, { CountryID: 202 });

            if (selectedCountryList[0].IsZipAvailable === 0) {
              this.setState({ hidefromzipcode: false });
            } else {
              this.setState({ hidefromzipcode: true });
            }
            var SelectedCountry = {
              value: selectedCountryList[0].CountryID,
              label: selectedCountryList[0].CountryName,
            };
            this.setState({
              FromSelectedCountry: SelectedCountry,
            });
            //================== FOR TO COUNTRY =========================
            document.getElementById("toCountrySelect").value = "";
          }
        })
        .catch((err) => {
          console.log("err...", err);
        });
    } catch (error) {}
  }

  countryChange = (e, type) => {
    console.log("dattacheckselectedo", e.target.value);
    if (type === "from") {
      this.setState({ FromIsFedxCity: 0, FromSelectedCountry: {} });
      let CountryId = e.target.value;
      let forzip = _.findIndex(this.state.CountryList, function (country) {
        return country.CountryID == CountryId;
      });
      let zip = this.state.CountryList[forzip];
      if (zip.CountryName !== "United States" && zip.IsFedexCity === 1) {
        this.setState({ FromIsFedxCity: 1 });
        this.getCityList(zip.CountryID, "from");
      } else if (zip.CountryName === "China") {
        this.getCityList(zip.CountryID, "from");
      }
      var FromSelectedCountry = {
        value: zip.CountryID,
        label: zip.CountryName,
      };

      this.setState({ FromSelectedCountry: FromSelectedCountry });
      this.setState({ FromZip: "", FromCity: "", FromFedExSelectedCity: "" });
      document.getElementById("fromzipSelect").value = "";
    }
    if (type === "to") {
      this.setState({ ToIsFedxCity: 0, ToSelectedCountry: {} });
      let CountryId = e.target.value;
      let forzip = _.findIndex(this.state.CountryList, function (country) {
        return country.CountryID == CountryId;
      });
      let zip = this.state.CountryList[forzip];
      if (zip.CountryName !== "United States" && zip.IsFedexCity === 1) {
        this.setState({ ToIsFedxCity: 1 });
        this.getCityList(zip.CountryID, "to");
      } else if (zip.CountryName === "China") {
        this.getCityList(zip.CountryID, "to");
      } else {
        this.setState({ hidetozipcode: true });
      }
      var ToSelectedCountry = {
        value: zip.CountryID,
        label: zip.CountryName,
      };
      this.setState({ ToSelectedCountry: ToSelectedCountry });
      this.setState({ ToZip: "", ToCity: "", ToFedExSelectedCity: "" });
      // document.getElementById("TozipSelect").value = "";
    }
  };

  getCityList = (value, type) => {
    var CityData = { CityType: "FedEx", CountryId: value };
    if (type === "from") {
      api
        .post("location/getCityList", CityData)
        .then((res) => {
          if (res.success) {
            var FedexCityList = res.data;
            this.setState({ FromFedExCityList: res.data });

            let FromFedExCityListOption = [];
            for (var i = 0; i < FedexCityList?.length; i++) {
              let FromFedExCityObject = {};
              FromFedExCityObject.label = FedexCityList[i]?.CityName;
              FromFedExCityObject.value = FedexCityList[i]?.CountryID;
              FromFedExCityListOption.push(FromFedExCityObject);
              console.log("checkdatttttab", FromFedExCityListOption);
              this.setState({
                FromFedExCityOptionValue: FromFedExCityListOption,
              });
            }
          } else {
            this.setState({ FromFedExCityList: [] });
          }
        })
        .catch((error) => {});
    } else {
      api
        .post("location/getCityList", CityData)
        .then((res) => {
          if (res.success) {
            var ToFedexCityList = res.data;
            this.setState({ ToFedExCityList: res.data });

            let ToFedExCityListOption = [];
            for (var i = 0; i < ToFedexCityList?.length; i++) {
              let ToFedExCityObject = {};
              ToFedExCityObject.label = ToFedexCityList[i]?.CityName;
              ToFedExCityObject.value = ToFedexCityList[i]?.CountryID;
              ToFedExCityListOption.push(ToFedExCityObject);

              this.setState({
                ToFedExCityOptionValue: ToFedExCityListOption,
              });
            }
          } else {
            this.setState({ ToFedExCityList: [] });
          }
        })
        .catch((error) => {});
    }
  };

  renderFedxCityOptions = (type) => {
    if (type === "from") {
      return this.state.FromFedExCityList.map((x) => {
        return <option value={x.CityCode}>{x.CityName}</option>;
      });
    } else {
      return this.state.ToFedExCityList.map((x) => {
        return <option value={x.CityCode}>{x.CityName}</option>;
      });
    }
  };

  finalStep = (key) => {
    console.log(
      "this.state.ToCity ",
      key,
      " | |",
      this.state.ToCity,
      "------ ",
      this.state.ToFedExSelectedCity
    );
    debugger;
    console.log(this.state.hidetozipcode, this.state.hidefromzipcode);
    if (this.state.hidefromzipcode === false) {
      if (this.state.FromCity === "") {
        stepValidate = false;
        this.setState({
          FromCityErr: true,
          FromCityErrText: "From city required",
        });
      } else {
        stepValidate = true;
        this.setState({
          FromCityErr: false,
          FromCityErrText: "",
        });
      }
    }
    if (this.state.flag == 1 && this.state.ThankyouPageMoveFromZip == false) {
      this.setState({ FromZip: "" });
      document.getElementById("fromzipSelect").value = "";
    } else if (
      this.state.flag2 == 1 &&
      this.state.ThankyouPageMoveToZip == false
    ) {
      // this.setState({
      //   ToZipErr: true,
      //   ToZipErrText: "To Zip code not found",
      // });
      // this.setState({ ToZip: "" });
      this.setState({
        ToZipErr: false,
        ToZipErrText: "",
      });

      document.getElementById("TozipSelect").value = "";

      this.setState({
        FromZipCodeErr: false,
        ToZipCodeHelperText: "",
      });
    } else {
      let emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // alert("True")
      let stepsList = this.state.Steps;
      let activeIndex = stepsList.findIndex((x) => x.classname === "active");
      this.setState({ activeIndex: activeIndex });

      this.hideLoader();
      var envelope = document.getElementById("envelope");
      var box = document.getElementById("box");
      var television = document.getElementById("television");
      var furniture = document.getElementById("furniture");
      var auto = document.getElementById("auto");

      var No_packBoxDetails = [];
      var WeightBoxDetails = [];
      var LengthBoxDetails = [];
      var WidthBoxDetails = [];
      var HeightBoxDetails = [];
      var ChargeWeightBoxDetails = [];
      var MakeCarDetails = [];
      var ModelCarDetails = [];
      var YearCarDetails = [];
      var MakeTelevisionDetails = [];
      var ModelTelevisionDetails = [];
      var WeightTelevisionDetails = [];
      var LengthTelevisionDetails = [];
      var WidthTelevisionDetails = [];
      var HeightTelevisionDetails = [];

      if (activeIndex == 0) {
        for (var i = 0; i < this.state.documentData.length; i++) {
          if (
            this.state.documentData[i] == "1" ||
            this.state.documentData[i] == "3" ||
            this.state.documentData[i] == "4" ||
            this.state.documentData[i] == "5"
          ) {
            this.setState({ packagetype: "Package" });
          }
        }
      }
      if (
        activeIndex == 1 &&
        this.state.Steps[activeIndex].stepId == "containerdetails"
      ) {
        var nopack = [];
        var temp = document.getElementsByName("BoxDetails[No_Pack]");
        var boxarray = [].concat.apply(nopack, temp);
        No_packBoxDetails = boxarray.map((x) => {
          return x.value;
        });

        var weightpack = [];
        var temp = document.getElementsByName("BoxDetails[Weight]");
        var boxweightarray = [].concat.apply(weightpack, temp);
        WeightBoxDetails = boxweightarray.map((x) => {
          return x.value;
        });

        var lengthpack = [];
        var temp = document.getElementsByName("BoxDetails[Length]");
        var lengthboxarray = [].concat.apply(lengthpack, temp);
        LengthBoxDetails = lengthboxarray.map((x) => {
          return x.value;
        });

        var widthpack = [];
        var temp = document.getElementsByName("BoxDetails[Width]");
        var widthboxarray = [].concat.apply(widthpack, temp);
        WidthBoxDetails = widthboxarray.map((x) => {
          return x.value;
        });

        var heightpack = [];
        var temp = document.getElementsByName("BoxDetails[Height]");
        var heightboxarray = [].concat.apply(heightpack, temp);
        HeightBoxDetails = heightboxarray.map((x) => {
          return x.value;
        });

        var carmake = [];
        var temp = document.getElementsByName("CarDetails[Make]");
        var makecararray = [].concat.apply(carmake, temp);
        MakeCarDetails = makecararray.map((x) => {
          return x.value;
        });

        var modelcar = [];
        var temp = document.getElementsByName("CarDetails[Model]");
        var modelcararray = [].concat.apply(modelcar, temp);
        ModelCarDetails = modelcararray.map((x) => {
          return x.value;
        });

        var yearcar = [];
        var temp = document.getElementsByName("CarDetails[Year]");
        var yearcararray = [].concat.apply(yearcar, temp);
        YearCarDetails = yearcararray.map((x) => {
          return x.value;
        });

        var notele = [];
        var temp = document.getElementsByName("TelevisionDetails[Make]");
        var maketelearray = [].concat.apply(notele, temp);
        var No_packTelevisionDetails = maketelearray.map((x) => {
          return x.value;
        });

        var notele = [];
        var temp = document.getElementsByName("TelevisionDetails[Make]");
        var makenewtelearray = [].concat.apply(notele, temp);
        MakeTelevisionDetails = makenewtelearray.map((x) => {
          return x.value;
        });

        var notele = [];
        var temp = document.getElementsByName("TelevisionDetails[Model]");
        var modelnewtelearray = [].concat.apply(notele, temp);
        ModelTelevisionDetails = modelnewtelearray.map((x) => {
          return x.value;
        });

        var weighttele = [];
        var temp = document.getElementsByName("TelevisionDetails[Weight]");
        var weighttelearray = [].concat.apply(weighttele, temp);
        WeightTelevisionDetails = weighttelearray.map((x) => {
          return x.value;
        });

        var lengthtele = [];
        var temp = document.getElementsByName("TelevisionDetails[Length]");
        var lengthtelearray = [].concat.apply(lengthtele, temp);
        LengthTelevisionDetails = lengthtelearray.map((x) => {
          return x.value;
        });

        var widthtele = [];
        var temp = document.getElementsByName("TelevisionDetails[Width]");
        var widthtelearray = [].concat.apply(widthtele, temp);
        var WidthTelevisionDetails = widthtelearray.map((x) => {
          return x.value;
        });

        var heighttele = [];
        var temp = document.getElementsByName("TelevisionDetails[Height]");
        var heighttelearray = [].concat.apply(heighttele, temp);
        var HeightTelevisionDetails = heighttelearray.map((x) => {
          return x.value;
        });

        var doc = [];
        var temp = document.getElementsByName("DocumnetDetails[]");
        var docarray = [].concat.apply(doc, temp);
        var DocumnetDetails = docarray.map((x) => {
          return x.value;
        });
      }

      if (activeIndex == 0) {
        if (
          envelope.classList.contains("selected") ||
          box.classList.contains("selected") ||
          television.classList.contains("selected") ||
          furniture.classList.contains("selected") ||
          auto.classList.contains("selected")
        ) {
          stepValidate = true;
        } else {
          stepValidate = false;
          this.setState({
            PackageDetailsErr: true,
            PackageDetailsErrText: "Please select shipment content",
          });
        }
      } else if (
        activeIndex == 1 &&
        this.state.Steps[activeIndex].stepId == "containerdetails"
      ) {
        this.state.documentData.find((x) => {
          if (x === "1") {
            for (let i = 0; i < No_packBoxDetails.length; i++) {
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] !== "" &&
                LengthBoxDetails[i] != "" &&
                WidthBoxDetails[i] !== "" &&
                HeightBoxDetails[i] !== ""
              ) {
                stepValidate = true;
              } else {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter correct values",
                });
              }
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] == "" &&
                LengthBoxDetails[i] == "" &&
                WidthBoxDetails[i] == "" &&
                HeightBoxDetails[i] == ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter weight & dimensions",
                });
              }
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] !== "" &&
                LengthBoxDetails[i] == "" &&
                WidthBoxDetails[i] == "" &&
                HeightBoxDetails[i] == ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter  dimensions",
                });
              }
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] == "" &&
                LengthBoxDetails[i] !== "" &&
                WidthBoxDetails[i] !== "" &&
                HeightBoxDetails[i] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter weight ",
                });
              }
              if (
                No_packBoxDetails[i] == "" &&
                WeightBoxDetails[i] !== "" &&
                LengthBoxDetails[i] !== "" &&
                WidthBoxDetails[i] !== "" &&
                HeightBoxDetails[i] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter No. of box  ",
                });
              }
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] !== "" &&
                LengthBoxDetails[i] !== "" &&
                WidthBoxDetails[i] == "" &&
                HeightBoxDetails[i] == ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter Dimensions width & Height",
                });
              }
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] !== "" &&
                LengthBoxDetails[i] !== "" &&
                WidthBoxDetails[i] !== "" &&
                HeightBoxDetails[i] == ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter Dimensions Height",
                });
              }
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] !== "" &&
                LengthBoxDetails[i] == "" &&
                WidthBoxDetails[i] !== "" &&
                HeightBoxDetails[i] == ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter Dimensions length & Height",
                });
              }
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] !== "" &&
                LengthBoxDetails[i] == "" &&
                WidthBoxDetails[i] !== "" &&
                HeightBoxDetails[i] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter Dimensions length ",
                });
              }
              if (
                No_packBoxDetails[i] !== "" &&
                WeightBoxDetails[i] !== "" &&
                LengthBoxDetails[i] == "" &&
                WidthBoxDetails[i] == "" &&
                HeightBoxDetails[i] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter Dimensions length & width",
                });
              }
              if (WeightBoxDetails[i] == 0) {
                stepValidate = false;
                this.setState({
                  BoxesErr: true,
                  BoxesErrText: "Please enter correct weight",
                });
              }
            }
          }
          if (x === "2") {
          }
          if (x === "3") {
          }

          if (x === "4") {
            for (let k = 0; k < No_packTelevisionDetails.length; k++) {
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] !== "" &&
                LengthTelevisionDetails[k] !== "" &&
                WidthTelevisionDetails[k] !== "" &&
                HeightTelevisionDetails[k] !== ""
              ) {
                stepValidate = true;
              } else {
                stepValidate = false;
                this.setState({
                  TelevisionErrText: "Please Enter correct values",
                });
              }
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] == "" &&
                LengthTelevisionDetails[k] == "" &&
                WidthTelevisionDetails[k] == "" &&
                HeightTelevisionDetails[k] == ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText:
                    "Please Enter Television Weight & Dimensions",
                });
              }
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] !== "" &&
                LengthTelevisionDetails[k] == "" &&
                WidthTelevisionDetails[k] == "" &&
                HeightTelevisionDetails[k] == ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText: "Please Enter Television Dimensions",
                });
              }
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] == "" &&
                LengthTelevisionDetails[k] !== "" &&
                WidthTelevisionDetails[k] !== "" &&
                HeightTelevisionDetails[k] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText: "Please Enter Television Weight",
                });
              }
              if (
                No_packTelevisionDetails[k] == "" &&
                WeightTelevisionDetails[k] == "" &&
                LengthTelevisionDetails[k] !== "" &&
                WidthTelevisionDetails[k] !== "" &&
                HeightTelevisionDetails[k] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText:
                    "Please Enter Television make & Television Weight",
                });
              }
              if (
                No_packTelevisionDetails[k] == "" &&
                WeightTelevisionDetails[k] !== "" &&
                LengthTelevisionDetails[k] == "" &&
                WidthTelevisionDetails[k] == "" &&
                HeightTelevisionDetails[k] == ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText:
                    "Please Enter Television make & Television Dimensions",
                });
              }
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] !== "" &&
                LengthTelevisionDetails[k] !== "" &&
                WidthTelevisionDetails[k] == "" &&
                HeightTelevisionDetails[k] == ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText:
                    "Please Enter  Television Dimensions width & Height",
                });
              }
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] !== "" &&
                LengthTelevisionDetails[k] !== "" &&
                WidthTelevisionDetails[k] !== "" &&
                HeightTelevisionDetails[k] == ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText:
                    "Please Enter  Television Dimensions Height",
                });
              }
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] !== "" &&
                LengthTelevisionDetails[k] == "" &&
                WidthTelevisionDetails[k] == "" &&
                HeightTelevisionDetails[k] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText:
                    "Please Enter  Television Dimensions length & width ",
                });
              }
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] !== "" &&
                LengthTelevisionDetails[k] == "" &&
                WidthTelevisionDetails[k] !== "" &&
                HeightTelevisionDetails[k] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText:
                    "Please Enter  Television Dimensions length",
                });
              }
              if (
                No_packTelevisionDetails[k] !== "" &&
                WeightTelevisionDetails[k] !== "" &&
                LengthTelevisionDetails[k] !== "" &&
                WidthTelevisionDetails[k] == "" &&
                HeightTelevisionDetails[k] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  TelevisionErrText:
                    "Please Enter  Television Dimensions width ",
                });
              }
            }
          }
          if (x === "5") {
            for (let j = 0; j < MakeCarDetails.length; j++) {
              if (
                MakeCarDetails[j] !== "" &&
                ModelCarDetails[j] !== "" &&
                YearCarDetails[j] !== ""
              ) {
                stepValidate = true;
              } else {
                stepValidate = false;
                this.setState({
                  CarErrText: "Please enter correct values",
                });
              }
              if (
                MakeCarDetails[j] !== "" &&
                ModelCarDetails[j] == "" &&
                YearCarDetails[j] == ""
              ) {
                stepValidate = false;
                this.setState({
                  CarErrText: "Please enter car model & car year",
                });
              }
              if (
                MakeCarDetails[j] !== "" &&
                ModelCarDetails[j] !== "" &&
                YearCarDetails[j] == ""
              ) {
                stepValidate = false;
                this.setState({
                  CarErrText: "Please enter car year",
                });
              }
              if (
                MakeCarDetails[j] !== "" &&
                ModelCarDetails[j] == "" &&
                YearCarDetails[j] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  CarErrText: "Please enter car model",
                });
              }
              if (
                MakeCarDetails[j] == "" &&
                ModelCarDetails[j] !== "" &&
                YearCarDetails[j] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  CarErrText: "Please enter car make",
                });
              }
              if (
                MakeCarDetails[j] == "" &&
                ModelCarDetails[j] == "" &&
                YearCarDetails[j] !== ""
              ) {
                stepValidate = false;
                this.setState({
                  CarErrText: "Please enter car make & car model",
                });
              }
              if (
                MakeCarDetails[j] == "" &&
                ModelCarDetails[j] !== "" &&
                YearCarDetails[j] == ""
              ) {
                stepValidate = false;
                this.setState({
                  CarErrText: "Please enter car make & car year",
                });
              }
            }
          }
        });
      } else if (
        (activeIndex == 2 &&
          this.state.Steps[activeIndex].stepId == "shipmentdetails") ||
        (activeIndex == 1 &&
          this.state.Steps[activeIndex].stepId == "shipmentdetails")
      ) {
        if (
          document.getElementById("toCountrySelect").value == "" &&
          document.getElementById("fromCountrySelect").value == "" &&
          this.state.FromZip == "" &&
          this.state.ToZip == ""
        ) {
          stepValidate = false;
          cogoToast.error("Please select country");
        } else {
          if (document.getElementById("toCountrySelect").value == "") {
            stepValidate = false;
            this.setState({
              ToCountryErr: true,
              ToCountryErrText: "Please select To Country",
            });
          } else if (document.getElementById("fromCountrySelect").value == "") {
            stepValidate = false;
            cogoToast.error("Please select From Country");
          } else if (
            this.state.hidefromzipcode &&
            this.state.FromZip == "" &&
            this.state.FromCity !== ""
          ) {
            stepValidate = false;
            this.setState({
              FromZipErr: true,
              FromZipErrText: "Please enter From Zip",
            });
          } else if (
            this.state.FromSelectedCountry.label === "China" &&
            this.state.FromZip == ""
          ) {
            stepValidate = false;
            this.setState({
              FromZipErr: true,
              FromZipErrText: "Please enter From Zip Code",
            });
          } else if (
            this.state.ToSelectedCountry.label === "China" &&
            this.state.ToZip === ""
          ) {
            stepValidate = false;
            this.setState({
              ToZipCodeEnterText: "Please enter To Zip Code",
            });
          } else if (
            this.state.hidetozipcode &&
            this.state.ToZip === "" &&
            this.state.ToCity !== ""
          ) {
            stepValidate = false;
            this.setState({
              ToZipCodeEnterText: "Please enter To Zip",
            });
          } else if (this.state.ToSelectedCountry.value === 37) {
            if (
              this.state.ToZip.length < 5 ||
              /[^A-Za-z@.0-9\d]/.test(this.state.ToZip)
            ) {
              stepValidate = false;
              this.setState({
                ToZipCodeEnterErr: true,
                ToZipCodeEnterText:
                  "Please enter the zip code at list 5 character",
              });
            }
          } else if (
            this.state.FromCity == "" &&
            this.state.FromIsFedxCity === 0 &&
            this.state.ThankyouPageMoveFromZip == false &&
            this.state.FromSelectedCountry.label !== "China"
          ) {
            stepValidate = false;
            this.setState({
              FromCityErr: true,
              FromCityErrText: "Please enter from city",
            });
          } else if (
            this.state.FromSelectedCountry.label === "China" &&
            CommonConfig.isEmpty(this.state.FromFedExSelectedCity)
          ) {
            stepValidate = false;
            this.setState({
              FromCityErr: true,
              FromCityErrText: "Please enter from city",
            });
          } else if (
            this.state.ToCity == "" &&
            this.state.ToIsFedxCity === 0 &&
            this.state.ThankyouPageMoveToZip == false &&
            this.state.ToSelectedCountry.label !== "China"
          ) {
            stepValidate = false;
            this.setState({
              ToCityErr: true,
              ToCityErrText: "Please Enter To city",
            });
          } else if (
            this.state.ToSelectedCountry.label === "China" &&
            CommonConfig.isEmpty(this.state.ToFedExSelectedCity)
          ) {
            stepValidate = false;
            this.setState({
              ToCityErr: true,
              ToCityErrText: "Please Enter To city",
            });
          } else {
            stepValidate = true;
          }
        }
      } else if (
        (activeIndex == 2 &&
          this.state.Steps[activeIndex].stepId == "shipperdetails") ||
        (activeIndex == 3 &&
          this.state.Steps[activeIndex].stepId == "shipperdetails")
      ) {
        if (
          this.state.ContactName == "" &&
          this.state.PhoneNumber == "" &&
          this.state.email == "" &&
          !emailRegex.test(this.state.email)
        ) {
          stepValidate = false;
          allValid = false;
          this.setState({
            cnameErrText: "Please enter contact name",
            ContactNumberErrText: "Please enter phone number",
            EmailErrText: "Please enter email",
          });
        } else if (
          (this, this.state.ContactName == "" && this.state.PhoneNumber == "")
        ) {
          stepValidate = false;
          allValid = false;
          this.setState({
            cnameErrText: "Please enter contact name",
            ContactNumberErrText: "Please enter phone number",
          });
        } else if (
          (this,
          this.state.PhoneNumber == "" &&
            this.state.email == "" &&
            !emailRegex.test(this.state.email))
        ) {
          stepValidate = false;
          allValid = false;
          this.setState({
            ContactNumberErrText: "Please enter phone number",
            EmailErrText: "Please enter email",
          });
          stepValidate = false;
          allValid = false;
        } else if (
          (this, this.state.email == "" && this.state.ContactName == "")
        ) {
          stepValidate = false;
          this.setState({
            cnameErrText: "Please enter contact name",
            EmailErrText: "Please enter email",
          });
        } else if ((this, this.state.email == "")) {
          stepValidate = false;
          allValid = false;
          this.setState({
            EmailErrText: "Please enter email",
          });
        } else if ((this, this.state.ContactName == "")) {
          stepValidate = false;
          allValid = false;
          this.setState({
            cnameErrText: "Please enter contact name",
          });
        } else if ((this, this.state.PhoneNumber == "")) {
          stepValidate = false;
          allValid = false;
          this.setState({
            ContactNumberErrText: "Please enter phone number",
          });
          stepValidate = false;
          allValid = false;
        } else {
          if (!emailRegex.test(this.state.email)) {
            stepValidate = false;
            allValid = false;
          } else {
            stepValidate = true;
            allValid = true;
          }
        }
      }
      if (
        (activeIndex == 2 &&
          this.state.Steps[activeIndex].stepId == "shipperdetails") ||
        (activeIndex == 3 &&
          this.state.Steps[activeIndex].stepId == "shipperdetails")
      ) {
        if (allValid) {
          if (key !== activeIndex) {
            this.setState({ NextButtonIdx: key });
            stepsList[key]["classname"] = "active";
            stepsList[activeIndex]["classname"] = "inactive";
            this.setState({ Steps: stepsList });
            let divID = stepsList[key]["stepId"];
            let activeDiv = stepsList[activeIndex]["stepId"];
            document.getElementById(divID).style.display = "block";
            document.getElementById(activeDiv).style.display = "none";
          }
        } else {
          stepValidate = false;
        }
      } else {
        debugger;
        if (stepValidate) {
          // if (key !== activeIndex) {
          //   this.setState({ NextButtonIdx: key });
          //   stepsList[key]["classname"] = "active";
          //   stepsList[activeIndex]["classname"] = "inactive";
          //   this.setState({ Steps: stepsList });
          //   let divID = stepsList[key]["stepId"];
          //   let activeDiv = stepsList[activeIndex]["stepId"];
          //   document.getElementById(divID).style.display = "block";
          //   document.getElementById(activeDiv).style.display = "none";
          // }
        }
      }
      //KRUTI
      if (stepValidate && allValid) {
        if (this.state.Steps[activeIndex].stepId == "shipsmart") {
          if (
            this.state.documentData.length === 1 &&
            this.state.documentData.indexOf("3") === -1 &&
            this.state.documentData.indexOf("5") === -1 &&
            this.state.documentData.indexOf("4") === -1 &&
            (this.state.FromSelectedCountry.value == 202 ||
              this.state.FromSelectedCountry.value == 37)
          ) {
            var PackageRes = [];
            var PersonList = [];
            var finalManagedBy = [];
            var ManagedBY = "";
            var Access = 0;
            var elsecalled = 0;
            var PackageName = "";
            var newpackagetype = "";

            if (this.state.documentData[0] == 2) {
              newpackagetype = "Document";
            }
            if (this.state.documentData[0] == 1) {
              newpackagetype = "Boxes";
            }
            if (this.state.documentData[0] == 4) {
              newpackagetype = "Television";
            }
            if (this.state.documentData[0] == 3) {
              newpackagetype = "Furniture";
            }
            if (this.state.documentData[0] == 5) {
              newpackagetype = "Auto";
            }
            var manageData = {};
            {
              this.state.PersonID
                ? (manageData = {
                    Email: this.state.email,
                    Phone: this.state.PhoneNumber,
                    PersonID: this.state.PersonID,
                    newpackagetype: newpackagetype,
                  })
                : (manageData = {
                    Email: this.state.email,
                    Phone: this.state.PhoneNumber,
                    PersonID: 0,
                    newpackagetype: newpackagetype,
                  });
            }

            this.showLoader();

            api
              .post("salesLead/getManagedByPhoneOREmail", manageData)
              .then((res) => {
                if (res.data.length > 0) {
                  ManagedBY = res.data[0].ManagedBy;
                  var counterData = {
                    PersonID: res.data[0].ManagedBy,
                  };
                  api
                    .post("userManagement/updateLeadCounter", counterData)
                    .then((counterDatares) => {});
                } else if (
                  this.state.PersonID != "" &&
                  this.state.UserAccess == 1
                ) {
                  var leadCountData = {
                    PersonID: this.state.PersonID,
                  };
                  api
                    .post("userManagement/updateLeadCounter", leadCountData)
                    .then((res) => {});
                } else {
                  if (this.state.FromSelectedCountry.value == 202) {
                    fetch(
                      CommonConfig.zipCodeAPIKey(
                        this.state.FromZip,
                        this.state.FromSelectedCountry.label
                      )
                    )
                      .then((result) => result.json())
                      .then((data) => {
                        var lat =
                          data["results"][0]["geometry"]["location"]["lat"];
                        var lon =
                          data["results"][0]["geometry"]["location"]["lng"];

                        fetch(CommonConfig.timezoneAPI(lat, lon))
                          .then((res) => res.json())
                          .then((data) => {
                            var timeZoneName = "";
                            if (
                              data["timeZoneName"].indexOf("Central") !== -1
                            ) {
                              timeZoneName = "Central";
                            }
                            if (
                              data["timeZoneName"].indexOf("Eastern") !== -1
                            ) {
                              timeZoneName = "Eastern";
                            }
                            if (
                              data["timeZoneName"].indexOf("Mountain") !== -1
                            ) {
                              timeZoneName = "Mountain";
                            }
                            if (
                              data["timeZoneName"].indexOf("Pacific") !== -1
                            ) {
                              timeZoneName = "Pacific";
                            }
                            if (data["timeZoneName"].indexOf("Alaska") !== -1) {
                              timeZoneName = "Alaska";
                            }
                            if (data["timeZoneName"].indexOf("Hawaii") !== -1) {
                              timeZoneName = "Hawaii";
                            }

                            var timeData = {
                              TimeZoneName: timeZoneName,
                            };
                            api
                              .post(
                                "userManagement/getTimeZoneAccess",
                                timeData
                              )
                              .then(async (res) => {
                                if (res.data.length > 0) {
                                  for (var i = 0; i < res.data.length; i++) {
                                    var leadAssignId = {
                                      LeadAssignmentID:
                                        res.data[i].LeadAssignmentID,
                                    };

                                    await api
                                      .post(
                                        "userManagement/getContentAccess",
                                        leadAssignId
                                      )
                                      .then((contentres) => {
                                        for (
                                          var p = 0;
                                          p < this.state.documentData.length;
                                          p++
                                        ) {
                                          PackageRes = contentres.data;
                                          if (this.state.documentData[p] == 1) {
                                            PackageName = "Boxes";
                                          }
                                          if (this.state.documentData[p] == 2) {
                                            PackageName = "Document";
                                          }
                                          if (this.state.documentData[p] == 3) {
                                            PackageName = "Furniture";
                                          }
                                          if (this.state.documentData[p] == 4) {
                                            PackageName = "Television";
                                          }
                                          if (this.state.documentData[p] == 5) {
                                            PackageName = "Auto";
                                          }

                                          PackageRes.forEach((item) => {
                                            if (
                                              item.ContentName == PackageName
                                            ) {
                                              if (item.IsAccess == 1) {
                                                Access = 1;
                                              } else {
                                                Access = 0;
                                                elsecalled = 1;
                                              }
                                            }
                                          });

                                          if (
                                            this.state.documentData.length ==
                                            p + 1
                                          ) {
                                            if (
                                              Access == 1 &&
                                              elsecalled != 1
                                            ) {
                                              var person = {
                                                PersonID: res.data[i].PersonID,
                                              };
                                              PersonList.push(person);
                                            }
                                          }
                                        }
                                      });
                                  }
                                }
                              });
                          });
                      });

                    for (var pr = 0; pr < PersonList.length; pr++) {
                      var personleaddat = {
                        PersonID: PersonList[pr].PersonID,
                      };
                      api
                        .post("userManagement/getLeadConidtions", personleaddat)
                        .then((leadres) => {
                          if (leadres.success == 1) {
                            if (leadres.data.succes == 1) {
                              var personId = [
                                {
                                  PersonID: PersonList[pr].PersonID,
                                  CurrentLeadsCount:
                                    leadres.data.CurrentLeadsCount,
                                },
                              ];
                              finalManagedBy.push(personId);
                            }
                          }
                        });
                    }

                    if (finalManagedBy.length > 0) {
                      var minval = finalManagedBy.reduce((x, y) => {
                        return x.CurrentLeadsCount < y.CurrentLeadsCount
                          ? x.CurrentLeadsCount
                          : y.CurrentLeadsCount;
                      });

                      var key = finalManagedBy.findIndex((x) => {
                        return x.CurrentLeadsCount == minval;
                      });

                      ManagedBY = finalManagedBy[key].PersonID;
                      var leadnewcntdata = {
                        PersonID: ManagedBY,
                      };

                      api
                        .post(
                          "userManagement/updateLeadCounter",
                          leadnewcntdata
                        )
                        .then((updateres) => {});
                    } else {
                      ManagedBY = null;
                    }
                  } else if (
                    this.state.ToSelectedCountry.value == 202 &&
                    this.state.FromSelectedCountry.value != 202
                  ) {
                    fetch(
                      CommonConfig.zipCodeAPIKey(
                        this.state.FromZip,
                        this.state.FromSelectedCountry.label
                      )
                    )
                      .then((result) => result.json())
                      .then((data) => {
                        var lat =
                          data["results"][0]["geometry"]["location"]["lat"];
                        var lon =
                          data["results"][0]["geometry"]["location"]["lng"];

                        fetch(CommonConfig.timezoneAPI(lat, lon))
                          .then((res) => res.json())
                          .then((data) => {
                            var timeZoneName = "";
                            if (
                              data["timeZoneName"].indexOf(
                                "Central Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Central";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Eastern Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Eastern";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Mountain Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Mountain";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Pacific Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Pacific";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Alaska Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Alaska";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Hawaii-Aleutian Standard Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Hawaii";
                            }

                            var timeData = {
                              TimeZoneName: timeZoneName,
                            };
                            api
                              .post(
                                "userManagement/getTimeZoneAccess",
                                timeData
                              )
                              .then((res) => {
                                if (res.data.length > 0) {
                                  for (var i = 0; i < res.data.length; i++) {
                                    var leadAssignId = {
                                      LeadAssignmentID:
                                        res.data[i].LeadAssignmentID,
                                    };

                                    api
                                      .post(
                                        "userManagement/getContentAccess",
                                        leadAssignId
                                      )
                                      .then((contentres) => {
                                        for (
                                          var p = 0;
                                          p < this.state.documentData.length;
                                          p++
                                        ) {
                                          PackageRes = contentres.data;
                                          if (this.state.documentData[p] == 1) {
                                            PackageName = "Boxes";
                                          }
                                          if (this.state.documentData[p] == 2) {
                                            PackageName = "Document";
                                          }
                                          if (this.state.documentData[p] == 3) {
                                            PackageName = "Furniture";
                                          }
                                          if (this.state.documentData[p] == 4) {
                                            PackageName = "Television";
                                          }
                                          if (this.state.documentData[p] == 5) {
                                            PackageName = "Auto";
                                          }

                                          PackageRes.forEach((item) => {
                                            if (
                                              item.ContentName == PackageName
                                            ) {
                                              if (item.IsAccess == 1) {
                                                Access = 1;
                                              } else {
                                                Access = 0;
                                                elsecalled = 1;
                                              }
                                            }
                                          });

                                          if (
                                            this.state.documentData.length ==
                                            p + 1
                                          ) {
                                            if (
                                              Access == 1 &&
                                              elsecalled != 1
                                            ) {
                                              var person = {
                                                PersonID: res.data[i].PersonID,
                                              };
                                              PersonList.push(person);
                                            }
                                          }
                                        }
                                      });
                                  }
                                }
                              });
                          });
                      });

                    for (var pr = 0; pr < PersonList.length; pr++) {
                      var personleaddat = {
                        PersonID: PersonList[pr].PersonID,
                      };

                      api
                        .post("userManagement/getLeadConidtions", personleaddat)
                        .then((leadres) => {
                          if (leadres.success == 1) {
                            if (leadres.data.succes == 1) {
                              var personId = [
                                {
                                  PersonID: PersonList[pr].PersonID,
                                  CurrentLeadsCount:
                                    leadres.data.CurrentLeadsCount,
                                },
                              ];

                              finalManagedBy.push(personId);
                            }
                          }
                        });
                    }

                    if (finalManagedBy.length > 0) {
                      var minval = finalManagedBy.reduce((x, y) => {
                        return x.CurrentLeadsCount < y.CurrentLeadsCount
                          ? x.CurrentLeadsCount
                          : y.CurrentLeadsCount;
                      });

                      var key = finalManagedBy.findIndex((x) => {
                        return x.CurrentLeadsCount == minval;
                      });

                      ManagedBY = finalManagedBy[key].PersonID;
                      var leadnewcntdata = {
                        PersonID: ManagedBY,
                      };

                      api
                        .post(
                          "userManagement/updateLeadCounter",
                          leadnewcntdata
                        )
                        .then((updateres) => {});
                    } else {
                      ManagedBY = null;
                    }
                  } else {
                    ManagedBY = null;
                  }
                }
                // Box Details 1
                var nopack = [];
                var temp = document.getElementsByName("BoxDetails[No_Pack]");
                var boxarray = [].concat.apply(nopack, temp);
                No_packBoxDetails = boxarray.map((x) => {
                  return x.value;
                });

                var weightpack = [];
                var temp = document.getElementsByName("BoxDetails[Weight]");
                var boxweightarray = [].concat.apply(weightpack, temp);
                WeightBoxDetails = boxweightarray.map((x) => {
                  return x.value;
                });

                var lengthpack = [];
                var temp = document.getElementsByName("BoxDetails[Length]");
                var lengthboxarray = [].concat.apply(lengthpack, temp);
                LengthBoxDetails = lengthboxarray.map((x) => {
                  return x.value;
                });

                var widthpack = [];
                var temp = document.getElementsByName("BoxDetails[Width]");
                var widthboxarray = [].concat.apply(widthpack, temp);
                WidthBoxDetails = widthboxarray.map((x) => {
                  return x.value;
                });

                var heightpack = [];
                var temp = document.getElementsByName("BoxDetails[Height]");
                var heightboxarray = [].concat.apply(heightpack, temp);
                HeightBoxDetails = heightboxarray.map((x) => {
                  return x.value;
                });

                //Calculation
                var filterFromCountryData = this.state.CountryList.filter(
                  (x) => x.CountryID == this.state.FromSelectedCountry.value
                );
                var filterToCountryData = this.state.CountryList.filter(
                  (x) => x.CountryID == this.state.ToSelectedCountry.value
                );
                if (
                  filterFromCountryData[0].CountryCode &&
                  filterToCountryData[0].CountryCode
                ) {
                  for (var i = 0; i < No_packBoxDetails.length; i++) {
                    var WE = 0;
                    var LE = 0;
                    var HE = 0;
                    var Total = 0;
                    var Weight = 0;
                    if (WeightBoxDetails[i]) {
                      Weight =
                        Number(WeightBoxDetails[i]) *
                        Number(No_packBoxDetails[i]);
                    }

                    if (WidthBoxDetails[i]) {
                      WE = Number(WidthBoxDetails[i]);
                    }

                    if (LengthBoxDetails[i]) {
                      LE = Number(LengthBoxDetails[i]);
                    }

                    if (HeightBoxDetails[i]) {
                      HE = Number(HeightBoxDetails[i]);
                    }

                    if (
                      filterFromCountryData[0].CountryCode == "US" &&
                      filterToCountryData[0].CountryCode == "US"
                    ) {
                      Total =
                        Math.ceil(parseFloat((WE * LE * HE) / 166)) *
                        Number(No_packBoxDetails[i]);
                    } else {
                      Total =
                        Math.ceil(parseFloat((WE * LE * HE) / 139)) *
                        Number(No_packBoxDetails[i]);
                    }

                    if (
                      filterFromCountryData[0].CountryCode == "IN" &&
                      filterToCountryData[0].CountryCode == "US"
                    ) {
                      Total =
                        Math.ceil(
                          parseFloat(parseFloat(Total) / parseFloat(2.2))
                        ) * Number(No_packBoxDetails[i]);
                    }

                    if (Weight > Total) {
                      ChargeWeightBoxDetails[i] = Number(Weight);
                    } else {
                      ChargeWeightBoxDetails[i] = Number(Total);
                    }
                  }
                }

                var carmake = [];
                var temp = document.getElementsByName("CarDetails[Make]");
                var makecararray = [].concat.apply(carmake, temp);
                MakeCarDetails = makecararray.map((x) => {
                  return x.value;
                });

                var modelcar = [];
                var temp = document.getElementsByName("CarDetails[Model]");
                var modelcararray = [].concat.apply(modelcar, temp);
                ModelCarDetails = modelcararray.map((x) => {
                  return x.value;
                });

                var yearcar = [];
                var temp = document.getElementsByName("CarDetails[Year]");
                var yearcararray = [].concat.apply(yearcar, temp);
                YearCarDetails = yearcararray.map((x) => {
                  return x.value;
                });

                var notele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Make]"
                );
                var maketelearray = [].concat.apply(notele, temp);
                var No_packTelevisionDetails = maketelearray.map((x) => {
                  return x.value;
                });

                var notele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Make]"
                );
                var makenewtelearray = [].concat.apply(notele, temp);
                MakeTelevisionDetails = makenewtelearray.map((x) => {
                  return x.value;
                });

                var notele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Model]"
                );
                var modelnewtelearray = [].concat.apply(notele, temp);
                ModelTelevisionDetails = modelnewtelearray.map((x) => {
                  return x.value;
                });

                var weighttele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Weight]"
                );
                var weighttelearray = [].concat.apply(weighttele, temp);
                WeightTelevisionDetails = weighttelearray.map((x) => {
                  return x.value;
                });

                var lengthtele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Length]"
                );
                var lengthtelearray = [].concat.apply(lengthtele, temp);
                LengthTelevisionDetails = lengthtelearray.map((x) => {
                  return x.value;
                });

                var widthtele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Width]"
                );
                var widthtelearray = [].concat.apply(widthtele, temp);
                var WidthTelevisionDetails = widthtelearray.map((x) => {
                  return x.value;
                });

                var heighttele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Height]"
                );
                var heighttelearray = [].concat.apply(heighttele, temp);
                var HeightTelevisionDetails = heighttelearray.map((x) => {
                  return x.value;
                });

                var doc = [];
                var temp = document.getElementsByName("DocumnetDetails[]");
                var docarray = [].concat.apply(doc, temp);
                var DocumnetDetails = docarray.map((x) => {
                  return x.value;
                });

                if (this.state.packagetype === "Envelope") {
                  this.state.packgedata.no_pack.push(1);
                  this.state.packgedata.weight.push(0.5);
                  this.state.packgedata.len.push(10);
                  this.state.packgedata.width.push(13);
                  this.state.packgedata.height.push(1);
                  this.state.packgedata.chargableWeight.push(1);
                  this.state.packgedata.insuredValue.push(0);
                } else {
                  this.state.documentData.find((x) => {
                    if (x === "1") {
                      for (let j = 0; j < No_packBoxDetails.length; j++) {
                        this.state.packgedata.no_pack.push(
                          No_packBoxDetails[j]
                        );
                        this.state.packgedata.weight.push(WeightBoxDetails[j]);
                        this.state.packgedata.len.push(LengthBoxDetails[j]);
                        this.state.packgedata.width.push(WidthBoxDetails[j]);
                        this.state.packgedata.height.push(HeightBoxDetails[j]);
                        this.state.packgedata.chargableWeight.push(
                          ChargeWeightBoxDetails[j]
                        );
                        this.state.packgedata.insuredValue.push(0);
                      }
                    }
                    // if (x === "3") {
                    // }
                    if (x === "4") {
                      for (let j = 0; j < MakeTelevisionDetails.length; j++) {
                        this.state.packgedata.no_pack.push(1);
                        this.state.packgedata.weight.push(
                          WeightTelevisionDetails[j]
                        );
                        this.state.packgedata.len.push(
                          LengthTelevisionDetails[j]
                        );
                        this.state.packgedata.width.push(
                          WidthTelevisionDetails[j]
                        );
                        this.state.packgedata.height.push(
                          HeightTelevisionDetails[j]
                        );
                        this.state.packgedata.chargableWeight.push(0);
                        this.state.packgedata.insuredValue.push(0);
                      }
                    }
                    if (x === "5") {
                    }
                  });
                }

                setTimeout(() => {
                  let PackageDetails = [];
                  let CarDetails = [];
                  this.state.documentData.find((x) => {
                    if (x === "1") {
                      for (var i = 0; i < No_packBoxDetails.length; i++) {
                        var packageOBJ = {
                          PackageType: x,
                          ActualWeight: WeightBoxDetails[i],
                          DimensionL: LengthBoxDetails[i],
                          DimensionW: WidthBoxDetails[i],
                          DimensionH: HeightBoxDetails[i],
                          ChargeableWeight: ChargeWeightBoxDetails[i],
                          Status: "Active",
                          Quantity: No_packBoxDetails[i],
                        };
                        PackageDetails.push(packageOBJ);
                      }
                    }
                    if (x === "2") {
                      var envelopOBJ = {
                        PackageType: x,
                        ActualWeight: 0.5,
                        DimensionL: 10,
                        DimensionW: 13,
                        DimensionH: 1,
                        ChargeableWeight: 1,
                        Status: "Active",
                        Quantity: 1,
                      };
                      PackageDetails.push(envelopOBJ);
                    }
                    if (x === "3") {
                      var packObj = {
                        PackageType: x,
                        ActualWeight: 0,
                        Status: "Active",
                        Quantity: 1,
                      };
                      PackageDetails.push(packObj);
                    }
                    if (x === "4") {
                      for (var i = 0; i < MakeTelevisionDetails.length; i++) {
                        var packageOBJ = {
                          PackageType: x,
                          ActualWeight: WeightTelevisionDetails[i],
                          DimensionL: LengthTelevisionDetails[i],
                          DimensionW: WidthTelevisionDetails[i],
                          DimensionH: HeightTelevisionDetails[i],
                          ChargeableWeight: 0,
                          Status: "Active",
                          TVMake: MakeTelevisionDetails[i],
                          TVModel: ModelTelevisionDetails[i],
                          Quantity: 1,
                        };
                        PackageDetails.push(packageOBJ);
                      }
                    }
                    if (x === "5") {
                      for (var i = 0; i < MakeCarDetails.length; i++) {
                        var carOBJ = {
                          PackageType: x,
                          CarMake: MakeCarDetails[i],
                          CarModel: ModelCarDetails[i],
                          CarYear: YearCarDetails[i],
                          Status: "Active",
                        };
                        PackageDetails.push(carOBJ);
                      }
                    }
                  });

                  var salesLeadData = {
                    urlredirect_path: this.state.page_redirectionPath,
                    userid: 1,
                    SalesLeadManagementID: null,
                    ManagedBy: ManagedBY,
                    SalesLeadsType: null,
                    ContactName: this.state.ContactName,
                    CompanyName: "",
                    Email: this.state.email,
                    PhoneNumber: this.state.PhoneNumber,
                    FromState: this.state.FromState,
                    FromCity:
                      this.state.FromCity === ""
                        ? this.state.FromFedExSelectedCity.value
                        : this.state.FromCity,
                    ToCity:
                      this.state.ToCity === ""
                        ? this.state.ToFedExSelectedCity.value
                        : this.state.ToCity,
                    FromZipCode: this.state.FromZip,
                    ToZipCode: this.state.ToZip,
                    FromCountryID: this.state.FromSelectedCountry.value,
                    ToState: this.state.ToState,
                    ToCountryID: this.state.ToSelectedCountry.value,
                    SalesLeadDate: null,
                    SalesLeadFollowupDate: null,
                    TentativeMoveDate: null,
                    ReferredBy: "",
                    IPAddress: null,
                    MACAddress: null,
                    DeliveryType:
                      this.state.IsResidential == 1
                        ? "Residential"
                        : "Commercial",
                    ProposalStatus: "New",
                    PackageList: PackageDetails,
                    CarList: CarDetails,
                    NoteList: null,
                    WeightType: null,
                  };
                  api
                    .post("salesLead/addSalesLead", salesLeadData)
                    .then((saleres) => {
                      var salesLeadID = saleres.data;
                      var TotalLength = 0;
                      var TotalWidth = 0;
                      var TotalHeight = 0;
                      var PackageDetails = [];
                      for (
                        var i = 0;
                        i < this.state.packgedata.no_pack.length;
                        i++
                      ) {
                        TotalLength += Number(this.state.packgedata.len[i]);
                        TotalWidth += Number(this.state.packgedata.width[i]);
                        TotalHeight += Number(this.state.packgedata.height[i]);
                        var packageOBJ = {
                          PackageNumber: this.state.packgedata.no_pack[i],
                          PackageWeight: this.state.packgedata.weight[i],
                          PackageWidth: this.state.packgedata.width[i],
                          PackageLength: this.state.packgedata.len[i],
                          PackageHeight: this.state.packgedata.height[i],
                          PackageChargableWeight: 0,
                          PackageInsuredValue: 0,
                        };
                        PackageDetails.push(packageOBJ);
                      }
                      var TotalChargeWeight = 0;
                      var TotalInsuredValue = 0;
                      var TotalWeight = 0;
                      var TotalChargable = 0;
                      var ChargableWeight = [];
                      var filterFromCountryData = this.state.CountryList.filter(
                        (x) =>
                          x.CountryID == this.state.FromSelectedCountry.value
                      );
                      var filterToCountryData = this.state.CountryList.filter(
                        (x) => x.CountryID == this.state.ToSelectedCountry.value
                      );
                      if (
                        filterFromCountryData[0].CountryCode &&
                        filterToCountryData[0].CountryCode
                      ) {
                        for (var i = 0; i < PackageDetails.length; i++) {
                          var WE = 0;
                          var LE = 0;
                          var HE = 0;
                          var Insure = 0;
                          var Total = 0;
                          var Weight = 0;
                          var Chargable = 0;
                          if (PackageDetails[i].PackageWeight) {
                            Weight =
                              Number(PackageDetails[i].PackageWeight) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageWidth) {
                            WE = Number(PackageDetails[i].PackageWidth);
                          }

                          if (PackageDetails[i].PackageLength) {
                            LE = Number(PackageDetails[i].PackageLength);
                          }

                          if (PackageDetails[i].PackageHeight) {
                            HE = Number(PackageDetails[i].PackageHeight);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "US" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 166)) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 139)) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "IN" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(
                                parseFloat(parseFloat(Total) / parseFloat(2.2))
                              ) * Number(PackageDetails[i].PackageNumber);
                          }

                          if (Weight > Total) {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Weight);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Weight);
                          } else {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Total);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Total);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            ChargableWeight.push(
                              PackageDetails[
                                i
                              ].PackageChargableWeight.toString()
                            );
                          }

                          if (PackageDetails[i].PackageInsuredValue) {
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            PackageDetails[i].PackageInsuredValue = 0;
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            Chargable = Number(
                              PackageDetails[i].PackageChargableWeight
                            );
                          }

                          TotalInsuredValue =
                            Number(TotalInsuredValue) + Number(Insure);
                          TotalWeight = Number(TotalWeight) + Number(Weight);
                          TotalChargable =
                            Number(TotalChargable) + Number(Chargable);
                        }
                      }
                      var PackageNumber1 = [];
                      var Weight1 = [];
                      var DimeL1 = [];
                      var DimeW1 = [];
                      var DimeH1 = [];
                      var ChargableWeight1 = [];
                      var InsuredValues1 = [];

                      var PackagedetailsFinalValues = [];

                      var TotalPackageNumber1 = 0;
                      var TotalLength1 = 0;
                      var TotalWidth1 = 0;
                      var TotalHeight1 = 0;
                      var TotalInsuredValues1 = 0;
                      for (var i = 0; i < PackageDetails.length; i++) {
                        if (PackageDetails[i].PackageNumber) {
                          TotalPackageNumber1 =
                            Number(TotalPackageNumber1) +
                            parseInt(PackageDetails[i].PackageNumber);
                          PackageNumber1.push(
                            PackageDetails[i].PackageNumber.toString()
                          );
                        } else {
                          PackageDetails[i].PackageNumber = "1";
                          TotalPackageNumber1 =
                            Number(TotalPackageNumber1) +
                            parseInt(PackageDetails[i].PackageNumber);
                          PackageNumber1.push(
                            PackageDetails[i].PackageNumber.toString()
                          );
                        }
                        Weight1.push(
                          PackageDetails[i].PackageWeight.toString()
                        );

                        if (PackageDetails[i].PackageLength.toString()) {
                          DimeL1.push(
                            PackageDetails[i].PackageLength.toString()
                          );
                        } else {
                          PackageDetails[i].PackageLength = "1";
                          DimeL1.push(
                            PackageDetails[i].PackageLength.toString()
                          );
                        }

                        if (PackageDetails[i].PackageWidth) {
                          DimeW1.push(
                            PackageDetails[i].PackageWidth.toString()
                          );
                        } else {
                          PackageDetails[i].PackageWidth = "1";
                          DimeW1.push(
                            PackageDetails[i].PackageWidth.toString()
                          );
                        }

                        if (PackageDetails[i].PackageHeight) {
                          DimeH1.push(
                            PackageDetails[i].PackageHeight.toString()
                          );
                        } else {
                          PackageDetails[i].PackageHeight = "1";
                          DimeH1.push(
                            PackageDetails[i].PackageHeight.toString()
                          );
                        }

                        if (PackageDetails[i].PackageChargableWeight) {
                          ChargableWeight1.push(
                            PackageDetails[i].PackageChargableWeight.toString()
                          );
                        }

                        if (PackageDetails[i].PackageInsuredValue) {
                          InsuredValues1.push(
                            PackageDetails[i].PackageInsuredValue.toString()
                          );
                        } else {
                          PackageDetails[i].PackageInsuredValue = "0";
                          InsuredValues1.push(
                            PackageDetails[i].PackageInsuredValue.toString()
                          );
                        }
                        TotalLength1 += parseInt(
                          PackageDetails[i].PackageLength
                        );
                        TotalWidth1 += parseInt(PackageDetails[i].PackageWidth);
                        TotalHeight1 += parseInt(
                          PackageDetails[i].PackageHeight
                        );
                        TotalInsuredValues1 += parseInt(
                          PackageDetails[i].PackageInsuredValue
                        );
                      }

                      TotalChargeWeight = 0;
                      TotalInsuredValue = 0;
                      TotalWeight = 0;
                      TotalChargable = 0;
                      ChargableWeight = [];
                      if (
                        filterFromCountryData[0].CountryCode &&
                        filterToCountryData[0].CountryCode
                      ) {
                        for (var i = 0; i < PackageDetails.length; i++) {
                          var WE = 0;
                          var LE = 0;
                          var HE = 0;
                          var Insure = 0;
                          var Total = 0;
                          var Weight = 0;
                          var Chargable = 0;
                          if (PackageDetails[i].PackageWeight) {
                            Weight =
                              Number(PackageDetails[i].PackageWeight) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageWidth) {
                            WE = Number(PackageDetails[i].PackageWidth);
                          }

                          if (PackageDetails[i].PackageLength) {
                            LE = Number(PackageDetails[i].PackageLength);
                          }

                          if (PackageDetails[i].PackageHeight) {
                            HE = Number(PackageDetails[i].PackageHeight);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "US" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 166)) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            Total =
                              Math.ceil(parseFloat((WE * LE * HE) / 139)) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (
                            filterFromCountryData[0].CountryCode == "IN" &&
                            filterToCountryData[0].CountryCode == "US"
                          ) {
                            Total =
                              Math.ceil(
                                parseFloat(parseFloat(Total) / parseFloat(2.2))
                              ) * Number(PackageDetails[i].PackageNumber);
                          }

                          if (Weight > Total) {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Weight);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Weight);
                          } else {
                            PackageDetails[i].PackageChargableWeight =
                              Number(Total);
                            TotalChargeWeight =
                              parseInt(TotalChargeWeight) + parseInt(Total);
                          }

                          ChargableWeight.push(
                            PackageDetails[i].PackageChargableWeight.toString()
                          );

                          if (PackageDetails[i].PackageInsuredValue) {
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          } else {
                            PackageDetails[i].PackageInsuredValue = 0;
                            Insure =
                              Number(PackageDetails[i].PackageInsuredValue) *
                              Number(PackageDetails[i].PackageNumber);
                          }

                          if (PackageDetails[i].PackageChargableWeight) {
                            Chargable = Number(
                              PackageDetails[i].PackageChargableWeight
                            );
                          }

                          TotalInsuredValue =
                            Number(TotalInsuredValue) + Number(Insure);
                          TotalWeight = Number(TotalWeight) + Number(Weight);
                          TotalChargable =
                            Number(TotalChargable) + Number(Chargable);
                        }
                      }
                      if (
                        TotalChargable < 50 &&
                        this.state.ThankyouPageMoveFromZip == false &&
                        this.state.ThankyouPageMoveToZip == false
                      ) {
                        var CurrDate = new Date();
                        var addDay = 0;

                        console.log("CurrDate.getDay() = ", CurrDate.getDay());
                        if (CurrDate.getDay() == 0) {
                          addDay = 2;
                        }
                        if (CurrDate.getDay() == 6) {
                          addDay = 3;
                        }

                        console.log("addDay = ", addDay);

                        var shipDateToSend = "";
                        if (addDay != 0) {
                          var shipDateToSend12 = CurrDate.setDate(
                            CurrDate.getDate() + addDay
                          );
                          shipDateToSend = new Date(
                            shipDateToSend12
                          ).toISOString();
                        } else {
                          shipDateToSend = new Date().toISOString();
                        }

                        console.log("DatestoSend = ", shipDateToSend);
                        var data = {
                          data: {
                            quoteData: {
                              PackageType: this.state.packagetype,
                              WeightType: "LBS",
                              UpsData: {
                                FromCountry: JSON.stringify(
                                  filterFromCountryData[0]
                                ),
                                FromCity:
                                  this.state.FromCity === ""
                                    ? this.state.FromFedExSelectedCity.value
                                    : this.state.FromCity,
                                FromUPSCity: this.state.FromUPSSelectedCity,
                                FromFedExCity: this.state.FromFedExSelectedCity,
                                FromZipCode: this.state.FromZip,
                                FromStateProvinceCode: this.state.fromStateName,
                                ToCountry: JSON.stringify(
                                  filterToCountryData[0]
                                ),
                                ToCity:
                                  this.state.ToCity === ""
                                    ? this.state.ToFedExSelectedCity.value
                                    : this.state.ToCity,
                                ToUPSCity: null,
                                ToFedExCity: null,
                                ToZipCode: this.state.ToZip,
                                ToStateProvinceCode: "",
                              },

                              PackageNumber: this.state.packgedata.no_pack,
                              Weight: this.state.packgedata.weight,
                              DimeL: this.state.packgedata.len,
                              DimeW: this.state.packgedata.width,
                              DimeH: this.state.packgedata.height,
                              TotalLength: TotalLength,
                              TotalWidth: TotalWidth,
                              TotalInsuredValues: TotalInsuredValue,
                              TotalHeight: TotalHeight,
                              ChargableWeight: ChargableWeight,
                              InsuredValues: this.state.packgedata.insuredValue,

                              TotalWeight: TotalChargable,
                              IsPickUp: false,
                              WeightCount: this.state.packgedata.weight.length,
                              LengthCount: this.state.packgedata.len.length,
                              WidthCount: this.state.packgedata.width.length,
                              HeightCount: this.state.packgedata.height.length,
                              PackCount: this.state.packgedata.no_pack.length,
                              PackageDetailsCount:
                                this.state.packgedata.no_pack.length,
                              PackageDetailsText:
                                this.state.packgedata.no_pack.length,
                              EnvelopeWeightLBSText: TotalChargable
                                ? TotalChargable
                                : 0,
                              ShipDate: shipDateToSend,

                              PackageDetails: PackageDetails,
                              AgentCode: 1,
                            },
                          },
                        };
                        if (
                          this.state.IsResidential === true ||
                          this.state.IsResidential === 1
                        ) {
                          data.data.quoteData.IsResidencial = true;
                        } else {
                          data.data.quoteData.IsResidencial = false;
                        }
                        data.data.quoteData.PackageNumber = PackageNumber1;
                        data.data.quoteData.Weight = Weight1;
                        data.data.quoteData.DimeL = DimeL1;
                        data.data.quoteData.DimeW = DimeW1;
                        data.data.quoteData.DimeH = DimeH1;
                        data.data.quoteData.TotalLength = TotalLength1;
                        data.data.quoteData.TotalWidth = TotalWidth1;
                        data.data.quoteData.TotalInsuredValues =
                          TotalInsuredValues1;
                        data.data.quoteData.TotalHeight = TotalHeight1;
                        data.data.quoteData.ChargableWeight = ChargableWeight1;
                        data.data.quoteData.InsuredValues = InsuredValues1;
                        data.data.quoteData.WeightCount = Weight1.length;
                        data.data.quoteData.LengthCount = DimeL1.length;
                        data.data.quoteData.WidthCount = DimeW1.length;
                        data.data.quoteData.HeightCount = DimeH1.length;

                        data.data.quoteData.PackCount =
                          TotalPackageNumber1.toString();
                        data.data.quoteData.PackageDetailsCount =
                          TotalPackageNumber1;
                        data.data.quoteData.PackageDetailsText =
                          TotalPackageNumber1.toString();
                        let imgArray = [];

                        api.post("getQuote/GetRateImages").then((msg) => {
                          imgArray = msg.data[0];
                          api
                            .post("getQuote/getRates", data.data)
                            .then((msg) => {
                              this.hideLoader();

                              if (
                                msg.data.length === 1 &&
                                msg.data[0].Service_Type === "Fedex Error"
                              ) {
                                this.hideLoader();
                                window.location = nextpageurl;
                              } else {
                                for (var i = 0; i < msg.data.length; i++) {
                                  if (
                                    msg.data[i].MainServiceName == "" ||
                                    msg.data[i].MainServiceName == undefined
                                  ) {
                                    if (
                                      msg.data[i].ServiceDisplayName.includes(
                                        "FEDEX"
                                      )
                                    ) {
                                      msg.data[i].MainServiceName = "FedEx";
                                    }
                                  }
                                }
                                let contentText = "Boxes";
                                if (this.state.packagetype == "Envelope") {
                                  contentText = "Envelop";
                                  TotalChargable = 0.5;
                                }

                                var arr1 = [];
                                var arr2 = [];
                                msg.data.forEach((obj) => {
                                  if (obj.IsError) {
                                    if (
                                      obj.Delivery_Date !==
                                      "Service was validated at the country level, but might not be valid for the actual intended city for the destination."
                                    ) {
                                      arr2.push(obj);
                                    }
                                  } else {
                                    if (
                                      obj.Delivery_Date !==
                                      "Service was validated at the country level, but might not be valid for the actual intended city for the destination."
                                    ) {
                                      arr1.push(obj);
                                    }
                                  }
                                });
                                var msg = [];
                                msg.data = arr1.concat(arr2);

                                for (
                                  var idx = 0;
                                  idx < msg.data.length;
                                  idx++
                                ) {
                                  const element = msg.data[idx];
                                  let isError = element.IsError;

                                  let Baseurl = window.btoa(
                                    msg.data[idx].ServiceType +
                                      "/" +
                                      msg.data[idx].MainServiceName +
                                      "/" +
                                      msg.data[idx].ServiceDisplayName +
                                      "/" +
                                      msg.data[idx].Rates.toFixed(2) +
                                      ""
                                  );

                                  let imgUrl = imgArray.filter(
                                    (x) =>
                                      x.MainServiceName ===
                                      element.MainServiceName
                                  );

                                  if (
                                    msg.data[idx].MainServiceName == "FedEx"
                                  ) {
                                    console.log(
                                      "msg.data[idx] = ",
                                      msg.data[idx].BaseP
                                    );

                                    var totalValue =
                                      ((msg.data[idx].BaseP -
                                        msg.data[idx].Rates) /
                                        msg.data[idx].BaseP) *
                                      100;
                                    totalValue = totalValue.toFixed(2);
                                    totalValue = Math.round(totalValue);

                                    element.discountPercentage = totalValue;
                                    console.log("Percent ", totalValue);
                                    msg.data[idx].Discounts = totalValue + "%";
                                  }

                                  msg.data[idx].urlIMG = imgUrl[0].IMGURL;
                                  let bookNowURL =
                                    bookurl +
                                    Baseurl +
                                    `?saleid=` +
                                    encodeURIComponent(salesLeadID);
                                  this.state.tempFinalImage.push(
                                    <div className="search-result-row">
                                      <div className="provide-img">
                                        <span>
                                          <img src={imgUrl[0].IMGURL}></img>
                                        </span>
                                      </div>
                                      <div className="provider-name">
                                        <h3>{element.ServiceDisplayName}</h3>
                                      </div>
                                      <div className="est-date">
                                        <span>Estimated Delivery</span>
                                        <p>{element.Delivery_Date}</p>
                                      </div>

                                      <div className="rates-discount">
                                        {element.MainServiceName == "FedEx" &&
                                        element.BaseP > 0 &&
                                        element.BaseP > element.Rates ? (
                                          <div className="est-discount">
                                            <span>
                                              Save {element.discountPercentage}%
                                            </span>
                                            <p>{element.BaseP} retail</p>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>

                                      <div className="quote-price">
                                        <h3>{element.Rates.toFixed(2)}</h3>
                                      </div>

                                      <div className="book-quote">
                                        {element.Delivery_Date !==
                                        "Invalid Destination Postal Code." ? (
                                          <a
                                            href={bookNowURL}
                                            className="next-btn"
                                          >
                                            Book Now{" "}
                                            <img
                                              src={arrowRightWhite}
                                              alt="Next"
                                            />
                                          </a>
                                        ) : (
                                          <div className="Disablebook-quote a">
                                            <a className="next-btn">
                                              Book Now{" "}
                                              <img
                                                src={arrowRightWhite}
                                                alt="Next"
                                              />
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                                this.setState({
                                  finalImage: this.state.tempFinalImage,
                                });

                                let mailData = {
                                  SalesLeadID: salesLeadID,
                                  ChargableWeight: ChargableWeight,
                                  RateData: msg.data,
                                  IsResidential: this.state.IsResidential,
                                  RateType: "Rates",
                                };
                                api
                                  .post("salesLead/sendGetRateEmail", mailData)
                                  .then((mailres) => {});
                              }
                            });
                        });
                      } else {
                        this.hideLoader();
                        window.location = nextpageurl;
                      }
                    });
                }, 3000);
              });
          } else {
            debugger;
            var PackageRes = [];
            var PersonList = [];
            var finalManagedBy = [];
            var ManagedBY = "";
            var Access = 0;
            var elsecalled = 0;
            var PackageName = "";
            var manageData = {};
            var newpackagetype = "";

            if (this.state.documentData[0] == 2) {
              newpackagetype = "Document";
            }
            if (this.state.documentData[0] == 1) {
              newpackagetype = "Boxes";
            }
            if (this.state.documentData[0] == 4) {
              newpackagetype = "Television";
            }
            if (this.state.documentData[0] == 3) {
              newpackagetype = "Furniture";
            }
            if (this.state.documentData[0] == 5) {
              newpackagetype = "Auto";
            }
            {
              this.state.PersonID
                ? (manageData = {
                    Email: this.state.email,
                    Phone: this.state.PhoneNumber,
                    PersonID: this.state.PersonID,
                    newpackagetype: newpackagetype,
                  })
                : (manageData = {
                    Email: this.state.email,
                    Phone: this.state.PhoneNumber,
                    PersonID: 0,
                    newpackagetype: newpackagetype,
                  });
            }

            this.showLoader();
            api
              .post("salesLead/getManagedByPhoneOREmail", manageData)
              .then((res) => {
                if (res.data.length > 0) {
                  var counterData = {
                    PersonID: res.data[0].ManagedBy,
                  };
                  ManagedBY = res.data[0].ManagedBy;
                  api
                    .post("userManagement/updateLeadCounter", counterData)
                    .then((res) => {});
                } else if (
                  this.state.PersonID != "" &&
                  this.state.UserAccess == 1
                ) {
                  var leadCountData = {
                    PersonID: res.data[0].ManagedBy,
                  };

                  api
                    .post("userManagement/updateLeadCounter", leadCountData)
                    .then((res) => {});
                } else {
                  if (this.state.FromSelectedCountry.value == 202) {
                    fetch(
                      CommonConfig.zipCodeAPIKey(
                        this.state.FromZip,
                        this.state.FromSelectedCountry.label
                      )
                    )
                      .then((result) => result.json())
                      .then((data) => {
                        var lat =
                          data["results"][0]["geometry"]["location"]["lat"];
                        var lon =
                          data["results"][0]["geometry"]["location"]["lng"];

                        fetch(CommonConfig.timezoneAPI(lat, lon))
                          .then((res) => res.json())
                          .then((data) => {
                            var timeZoneName = "";
                            if (
                              data["timeZoneName"].indexOf("Central") !== -1
                            ) {
                              timeZoneName = "Central";
                            }
                            if (
                              data["timeZoneName"].indexOf("Eastern") !== -1
                            ) {
                              timeZoneName = "Eastern";
                            }
                            if (
                              data["timeZoneName"].indexOf("Mountain") !== -1
                            ) {
                              timeZoneName = "Mountain";
                            }
                            if (
                              data["timeZoneName"].indexOf("Pacific") !== -1
                            ) {
                              timeZoneName = "Pacific";
                            }
                            if (data["timeZoneName"].indexOf("Alaska") !== -1) {
                              timeZoneName = "Alaska";
                            }
                            if (data["timeZoneName"].indexOf("Hawaii") !== -1) {
                              timeZoneName = "Hawaii";
                            }

                            var timeData = {
                              TimeZoneName: timeZoneName,
                            };
                            api
                              .post(
                                "userManagement/getTimeZoneAccess",
                                timeData
                              )
                              .then((res) => {
                                if (res.data.length > 0) {
                                  for (var i = 0; i < res.data.length; i++) {
                                    var leadAssignId = {
                                      LeadAssignmentID:
                                        res.data[i].LeadAssignmentID,
                                    };

                                    api
                                      .post(
                                        "userManagement/getContentAccess",
                                        leadAssignId
                                      )
                                      .then((contentres) => {
                                        for (
                                          var p = 0;
                                          p < this.state.documentData.length;
                                          p++
                                        ) {
                                          PackageRes = contentres.data;
                                          if (this.state.documentData[p] == 1) {
                                            PackageName = "Boxes";
                                          }
                                          if (this.state.documentData[p] == 2) {
                                            PackageName = "Document";
                                          }
                                          if (this.state.documentData[p] == 3) {
                                            PackageName = "Furniture";
                                          }
                                          if (this.state.documentData[p] == 4) {
                                            PackageName = "Television";
                                          }
                                          if (this.state.documentData[p] == 5) {
                                            PackageName = "Auto";
                                          }

                                          PackageRes.forEach((item) => {
                                            if (
                                              item.ContentName == PackageName
                                            ) {
                                              if (item.IsAccess == 1) {
                                                Access = 1;
                                              } else {
                                                Access = 0;
                                                elsecalled = 1;
                                              }
                                            }
                                          });

                                          if (
                                            this.state.documentData.length ==
                                            p + 1
                                          ) {
                                            if (
                                              Access == 1 &&
                                              elsecalled != 1
                                            ) {
                                              var person = {
                                                PersonID: res.data[i].PersonID,
                                              };
                                              PersonList.push(person);
                                            }
                                          }
                                        }
                                      });
                                  }
                                }
                              });
                          });
                      });

                    for (var pr = 0; pr < PersonList.length; pr++) {
                      var personleaddat = {
                        PersonID: PersonList[pr].PersonID,
                      };

                      api
                        .post("userManagement/getLeadConidtions", personleaddat)
                        .then((leadres) => {
                          if (leadres.success == 1) {
                            if (leadres.data.succes == 1) {
                              var personId = [
                                {
                                  PersonID: PersonList[pr].PersonID,
                                  CurrentLeadsCount:
                                    leadres.data.CurrentLeadsCount,
                                },
                              ];

                              finalManagedBy.push(personId);
                            }
                          }
                        });
                    }
                    if (finalManagedBy.length > 0) {
                      var minval = finalManagedBy.reduce((x, y) => {
                        return x.CurrentLeadsCount < y.CurrentLeadsCount
                          ? x.CurrentLeadsCount
                          : y.CurrentLeadsCount;
                      });

                      var key = finalManagedBy.findIndex((x) => {
                        return x.CurrentLeadsCount == minval;
                      });
                      ManagedBY = finalManagedBy[key].PersonID;
                      var leadnewcntdata = {
                        PersonID: ManagedBY,
                      };

                      api
                        .post(
                          "userManagement/updateLeadCounter",
                          leadnewcntdata
                        )
                        .then((updateres) => {});
                    } else {
                      ManagedBY = null;
                    }
                  } else if (
                    this.state.ToSelectedCountry.value == 202 &&
                    this.state.FromSelectedCountry.value != 202
                  ) {
                    fetch(
                      CommonConfig.zipCodeAPIKey(
                        this.state.FromZip,
                        this.state.FromSelectedCountry.label
                      )
                    )
                      .then((result) => result.json())
                      .then((data) => {
                        var lat =
                          data["results"][0]["geometry"]["location"]["lat"];
                        var lon =
                          data["results"][0]["geometry"]["location"]["lng"];

                        fetch(CommonConfig.timezoneAPI(lat, lon))
                          .then((res) => res.json())
                          .then((data) => {
                            var timeZoneName = "";
                            if (
                              data["timeZoneName"].indexOf(
                                "Central Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Central";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Eastern Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Eastern";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Mountain Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Mountain";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Pacific Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Pacific";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Alaska Daylight Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Alaska";
                            }
                            if (
                              data["timeZoneName"].indexOf(
                                "Hawaii-Aleutian Standard Time"
                              ) !== -1
                            ) {
                              timeZoneName = "Hawaii";
                            }

                            var timeData = {
                              TimeZoneName: timeZoneName,
                            };
                            api
                              .post(
                                "userManagement/getTimeZoneAccess",
                                timeData
                              )
                              .then((res) => {
                                if (res.data.length > 0) {
                                  for (var i = 0; i < res.data.length; i++) {
                                    var leadAssignId = {
                                      LeadAssignmentID:
                                        res.data[i].LeadAssignmentID,
                                    };

                                    api
                                      .post(
                                        "userManagement/getContentAccess",
                                        leadAssignId
                                      )
                                      .then((contentres) => {
                                        for (
                                          var p = 0;
                                          p < this.state.documentData.length;
                                          p++
                                        ) {
                                          PackageRes = contentres.data;
                                          if (this.state.documentData[p] == 1) {
                                            PackageName = "Boxes";
                                          }
                                          if (this.state.documentData[p] == 2) {
                                            PackageName = "Document";
                                          }
                                          if (this.state.documentData[p] == 3) {
                                            PackageName = "Furniture";
                                          }
                                          if (this.state.documentData[p] == 4) {
                                            PackageName = "Television";
                                          }
                                          if (this.state.documentData[p] == 5) {
                                            PackageName = "Auto";
                                          }

                                          PackageRes.forEach((item) => {
                                            if (
                                              item.ContentName == PackageName
                                            ) {
                                              if (item.IsAccess == 1) {
                                                Access = 1;
                                              } else {
                                                Access = 0;
                                                elsecalled = 1;
                                              }
                                            }
                                          });

                                          if (
                                            this.state.documentData.length ==
                                            p + 1
                                          ) {
                                            if (
                                              Access == 1 &&
                                              elsecalled != 1
                                            ) {
                                              var person = {
                                                PersonID: res.data[i].PersonID,
                                              };
                                              PersonList.push(person);
                                            }
                                          }
                                        }
                                      });
                                  }
                                }
                              });
                          });
                      });
                    for (var pr = 0; pr < PersonList.length; pr++) {
                      var personleaddat = {
                        PersonID: PersonList[pr].PersonID,
                      };

                      api
                        .post("userManagement/getLeadConidtions", personleaddat)
                        .then((leadres) => {
                          if (leadres.success == 1) {
                            if (leadres.data.succes == 1) {
                              var personId = [
                                {
                                  PersonID: PersonList[pr].PersonID,
                                  CurrentLeadsCount:
                                    leadres.data.CurrentLeadsCount,
                                },
                              ];

                              finalManagedBy.push(personId);
                            }
                          }
                        });
                    }
                    if (finalManagedBy.length > 0) {
                      var minval = finalManagedBy.reduce((x, y) => {
                        return x.CurrentLeadsCount < y.CurrentLeadsCount
                          ? x.CurrentLeadsCount
                          : y.CurrentLeadsCount;
                      });

                      var key = finalManagedBy.findIndex((x) => {
                        return x.CurrentLeadsCount == minval;
                      });

                      ManagedBY = finalManagedBy[key].PersonID;
                      var leadnewcntdata = {
                        PersonID: ManagedBY,
                      };

                      api
                        .post(
                          "userManagement/updateLeadCounter",
                          leadnewcntdata
                        )
                        .then((updateres) => {});
                    } else {
                      ManagedBY = null;
                    }
                  } else {
                    ManagedBY = null;
                  }
                }
                // Box Details
                var nopack = [];
                var temp = document.getElementsByName("BoxDetails[No_Pack]");
                var boxarray = [].concat.apply(nopack, temp);
                No_packBoxDetails = boxarray.map((x) => {
                  return x.value;
                });
                var weightpack = [];
                var temp = document.getElementsByName("BoxDetails[Weight]");
                var boxweightarray = [].concat.apply(weightpack, temp);
                WeightBoxDetails = boxweightarray.map((x) => {
                  return x.value;
                });
                var lengthpack = [];
                var temp = document.getElementsByName("BoxDetails[Length]");
                var lengthboxarray = [].concat.apply(lengthpack, temp);
                LengthBoxDetails = lengthboxarray.map((x) => {
                  return x.value;
                });
                var widthpack = [];
                var temp = document.getElementsByName("BoxDetails[Width]");
                var widthboxarray = [].concat.apply(widthpack, temp);
                WidthBoxDetails = widthboxarray.map((x) => {
                  return x.value;
                });
                var heightpack = [];
                var temp = document.getElementsByName("BoxDetails[Height]");
                var heightboxarray = [].concat.apply(heightpack, temp);
                HeightBoxDetails = heightboxarray.map((x) => {
                  return x.value;
                });

                var carmake = [];
                var temp = document.getElementsByName("CarDetails[Make]");
                var makecararray = [].concat.apply(carmake, temp);
                MakeCarDetails = makecararray.map((x) => {
                  return x.value;
                });
                var modelcar = [];
                var temp = document.getElementsByName("CarDetails[Model]");
                var modelcararray = [].concat.apply(modelcar, temp);
                ModelCarDetails = modelcararray.map((x) => {
                  return x.value;
                });
                var yearcar = [];
                var temp = document.getElementsByName("CarDetails[Year]");
                var yearcararray = [].concat.apply(yearcar, temp);
                YearCarDetails = yearcararray.map((x) => {
                  return x.value;
                });
                var notele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Make]"
                );
                var maketelearray = [].concat.apply(notele, temp);
                var No_packTelevisionDetails = maketelearray.map((x) => {
                  return x.value;
                });

                var notele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Make]"
                );
                var makenewtelearray = [].concat.apply(notele, temp);
                MakeTelevisionDetails = makenewtelearray.map((x) => {
                  return x.value;
                });
                var notele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Model]"
                );
                var modelnewtelearray = [].concat.apply(notele, temp);
                ModelTelevisionDetails = modelnewtelearray.map((x) => {
                  return x.value;
                });
                var weighttele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Weight]"
                );
                var weighttelearray = [].concat.apply(weighttele, temp);
                WeightTelevisionDetails = weighttelearray.map((x) => {
                  return x.value;
                });
                var lengthtele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Length]"
                );
                var lengthtelearray = [].concat.apply(lengthtele, temp);
                LengthTelevisionDetails = lengthtelearray.map((x) => {
                  return x.value;
                });
                var widthtele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Width]"
                );
                var widthtelearray = [].concat.apply(widthtele, temp);
                var WidthTelevisionDetails = widthtelearray.map((x) => {
                  return x.value;
                });

                var heighttele = [];
                var temp = document.getElementsByName(
                  "TelevisionDetails[Height]"
                );
                var heighttelearray = [].concat.apply(heighttele, temp);
                var HeightTelevisionDetails = heighttelearray.map((x) => {
                  return x.value;
                });
                var doc = [];
                var temp = document.getElementsByName("DocumnetDetails[]");
                var docarray = [].concat.apply(doc, temp);
                var DocumnetDetails = docarray.map((x) => {
                  return x.value;
                });
                setTimeout(() => {
                  let PackageDetails = [];
                  let CarDetails = [];
                  this.state.documentData.find((x) => {
                    if (x === "1") {
                      for (var i = 0; i < No_packBoxDetails.length; i++) {
                        var packageOBJ = {
                          PackageType: x,
                          ActualWeight: WeightBoxDetails[i],
                          DimensionL: LengthBoxDetails[i],
                          DimensionW: WidthBoxDetails[i],
                          DimensionH: HeightBoxDetails[i],
                          ChargeableWeight: 0,
                          Status: "Active",
                          Quantity: No_packBoxDetails[i],
                        };
                        PackageDetails.push(packageOBJ);
                      }
                    }
                    if (x === "2") {
                      var envelopOBJ = {
                        PackageType: x,
                        ActualWeight: 0.5,
                        DimensionL: 10,
                        DimensionW: 13,
                        DimensionH: 1,
                        ChargeableWeight: 1,
                        Status: "Active",
                        Quantity: 1,
                      };
                      PackageDetails.push(envelopOBJ);
                    }
                    if (x === "3") {
                      var packObj = {
                        PackageType: x,
                        ActualWeight: 0,
                        Status: "Active",
                        Quantity: 1,
                      };
                      PackageDetails.push(packObj);
                    }
                    if (x === "4") {
                      for (var i = 0; i < MakeTelevisionDetails.length; i++) {
                        var packageOBJ = {
                          PackageType: x,
                          ActualWeight: WeightTelevisionDetails[i],
                          DimensionL: LengthTelevisionDetails[i],
                          DimensionW: WidthTelevisionDetails[i],
                          DimensionH: HeightTelevisionDetails[i],
                          ChargeableWeight: 0,
                          Status: "Active",
                          TVMake: MakeTelevisionDetails[i],
                          TVModel: ModelTelevisionDetails[i],
                          Quantity: 1,
                        };
                        PackageDetails.push(packageOBJ);
                      }
                    }
                    if (x === "5") {
                      for (var i = 0; i < MakeCarDetails.length; i++) {
                        var carOBJ = {
                          PackageType: x,
                          CarMake: MakeCarDetails[i],
                          CarModel: ModelCarDetails[i],
                          CarYear: YearCarDetails[i],
                          Status: "Active",
                        };
                        PackageDetails.push(carOBJ);
                      }
                    }
                  });

                  var salesLeadData = {
                    urlredirect_path: this.state.page_redirectionPath,
                    userid: 1,
                    SalesLeadManagementID: null,
                    ManagedBy: ManagedBY,
                    SalesLeadsType: null,
                    ContactName: this.state.ContactName,
                    CompanyName: "",
                    Email: this.state.email,
                    PhoneNumber: this.state.PhoneNumber,
                    FromState: this.state.FromState,
                    FromCity:
                      this.state.FromCity === ""
                        ? this.state.FromFedExSelectedCity.value
                        : this.state.FromCity,
                    ToCity:
                      this.state.ToCity === ""
                        ? this.state.ToFedExSelectedCity.value
                        : this.state.ToCity,
                    FromZipCode: this.state.FromZip,
                    ToZipCode: this.state.ToZip,
                    FromCountryID: this.state.FromSelectedCountry.value,
                    ToState: this.state.ToState,
                    ToCountryID: this.state.ToSelectedCountry.value,
                    SalesLeadDate: null,
                    SalesLeadFollowupDate: null,
                    TentativeMoveDate: null,
                    ReferredBy: "",
                    IPAddress: null,
                    MACAddress: null,
                    DeliveryType:
                      this.state.IsResidential == 1
                        ? "Residential"
                        : "Commercial",
                    ProposalStatus: "New",
                    PackageList: PackageDetails,
                    CarList: CarDetails,
                    NoteList: null,
                    WeightType: null,
                  };

                  api
                    .post("salesLead/addSalesLead", salesLeadData)
                    .then((saleres) => {
                      this.hideLoader();
                      window.location = nextpageurl;
                    });
                }, 3000);
              });
          }
        }
      }
    }
  };

  navigateChange = (key) => {
    debugger;
    let stepsList = this.state.Steps;
    let activeIndex = stepsList.findIndex((x) => x.classname === "active");
    this.setState({ activeIndex: activeIndex });
    if (
      activeIndex == 0 &&
      this.state.Steps[activeIndex].stepId == "shipperdetails"
    ) {
      document.getElementById("step1").className = "active";
      document.getElementById("step3").className = "";
    } else if (
      (activeIndex == 1 || activeIndex == 2) &&
      this.state.Steps[activeIndex].stepId == "packagedetails"
    ) {
      document.getElementById("step2").className = "active";
      document.getElementById("step1").className = "";
      // this.setState({ showBoxDetails: true });
      // if (this.state.SelectedPakage == "box") {
      //   this.setState({ showBoxDetails: true });
      // } else if (this.state.SelectedPakage == "television") {
      //   this.setState({ showTVDetails: true });
      // } else if (this.state.SelectedPakage == "auto") {
      //   this.setState({ showCarDetails: true });
      // }
    } else if (
      activeIndex == 2 &&
      this.state.Steps[activeIndex].stepId == "shipmentdetails"
    ) {
      document.getElementById("step4").className = "active";
      document.getElementById("step2").className = "";
    } else if (
      activeIndex == 3 &&
      this.state.Steps[activeIndex].stepId == "shipsmart"
    ) {
      this.finalStep(key);
    }

    if (key !== activeIndex) {
      this.setState({ NextButtonIdx: key });
      stepsList[key]["classname"] = "active";
      stepsList[activeIndex]["classname"] = "inactive";
      this.setState({ Steps: stepsList });
      console.log("stepssss", this.state.Steps);
      let divID = stepsList[key]["stepId"];
      let activeDiv = stepsList[activeIndex]["stepId"];
      console.log("divID", divID);
      console.log("activeDiv", activeDiv);
      document.getElementById(divID).style.display = "block";
      document.getElementById(activeDiv).style.display = "none";
    }
    // if (this.state.hidefromzipcode === false) {
    //   if (this.state.FromCity === "") {
    //     stepValidate = false;
    //     this.setState({
    //       FromCityErr: true,
    //       FromCityErrText: "From city required",
    //     });
    //   } else {
    //     stepValidate = true;
    //     this.setState({
    //       FromCityErr: false,
    //       FromCityErrText: "",
    //     });
    //   }
    // }
    // if (this.state.flag == 1 && this.state.ThankyouPageMoveFromZip == false) {
    //   this.setState({ FromZip: "" });
    //   document.getElementById("fromzipSelect").value = "";
    // } else if (
    //   this.state.flag2 == 1 &&
    //   this.state.ThankyouPageMoveToZip == false
    // ) {
    //   // this.setState({
    //   //   ToZipErr: true,
    //   //   ToZipErrText: "To Zip code not found",
    //   // });
    //   // this.setState({ ToZip: "" });
    //   this.setState({
    //     ToZipErr: false,
    //     ToZipErrText: "",
    //   });

    //   document.getElementById("TozipSelect").value = "";

    //   this.setState({
    //     FromZipCodeErr: false,
    //     ToZipCodeHelperText: "",
    //   });
    // } else {
    //   let emailRegex =
    //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   // alert("True")
    //   let stepsList = this.state.Steps;
    //   let activeIndex = stepsList.findIndex((x) => x.classname === "active");
    //   this.setState({ activeIndex: activeIndex });
    //   // this.setState({ activeIndex: stepsList });
    //   this.setState({ nextStepValue: activeIndex });

    //   console.log("cheacksteplist", stepsList);
    //   console.log("cheacksteplistacti", activeIndex);

    //   // this.hideLoader();

    //   var envelope = document.getElementById("envelope");
    //   var box = document.getElementById("box");
    //   var television = document.getElementById("television");
    //   var furniture = document.getElementById("furniture");
    //   var auto = document.getElementById("auto");
    //   var packageDetails = document.getElementById("packageDetails");

    //   var No_packBoxDetails = [];
    //   var WeightBoxDetails = [];
    //   var LengthBoxDetails = [];
    //   var WidthBoxDetails = [];
    //   var HeightBoxDetails = [];
    //   var ChargeWeightBoxDetails = [];
    //   var MakeCarDetails = [];
    //   var ModelCarDetails = [];
    //   var YearCarDetails = [];
    //   var MakeTelevisionDetails = [];
    //   var ModelTelevisionDetails = [];
    //   var WeightTelevisionDetails = [];
    //   var LengthTelevisionDetails = [];
    //   var WidthTelevisionDetails = [];
    //   var HeightTelevisionDetails = [];

    //   if (activeIndex == 0) {
    //     for (var i = 0; i < this.state.documentData.length; i++) {
    //       if (
    //         this.state.documentData[i] == "1" ||
    //         this.state.documentData[i] == "3" ||
    //         this.state.documentData[i] == "4" ||
    //         this.state.documentData[i] == "5"
    //       ) {
    //         this.setState({ packagetype: "Package" });
    //       }
    //     }
    //   }

    //   if (
    //     activeIndex == 1 &&
    //     this.state.Steps[activeIndex].stepId == "containerdetails"
    //   ) {
    //     var nopack = [];
    //     var temp = document.getElementsByName("BoxDetails[No_Pack]");
    //     var boxarray = [].concat.apply(nopack, temp);
    //     No_packBoxDetails = boxarray.map((x) => {
    //       return x.value;
    //     });
    //     var weightpack = [];
    //     var temp = document.getElementsByName("BoxDetails[Weight]");
    //     var boxweightarray = [].concat.apply(weightpack, temp);
    //     WeightBoxDetails = boxweightarray.map((x) => {
    //       return x.value;
    //     });

    //     var lengthpack = [];
    //     var temp = document.getElementsByName("BoxDetails[Length]");
    //     var lengthboxarray = [].concat.apply(lengthpack, temp);
    //     LengthBoxDetails = lengthboxarray.map((x) => {
    //       return x.value;
    //     });

    //     var widthpack = [];
    //     var temp = document.getElementsByName("BoxDetails[Width]");
    //     var widthboxarray = [].concat.apply(widthpack, temp);
    //     WidthBoxDetails = widthboxarray.map((x) => {
    //       return x.value;
    //     });

    //     var heightpack = [];
    //     var temp = document.getElementsByName("BoxDetails[Height]");
    //     var heightboxarray = [].concat.apply(heightpack, temp);
    //     HeightBoxDetails = heightboxarray.map((x) => {
    //       return x.value;
    //     });

    //     var carmake = [];
    //     var temp = document.getElementsByName("CarDetails[Make]");
    //     var makecararray = [].concat.apply(carmake, temp);
    //     MakeCarDetails = makecararray.map((x) => {
    //       return x.value;
    //     });

    //     var modelcar = [];
    //     var temp = document.getElementsByName("CarDetails[Model]");
    //     var modelcararray = [].concat.apply(modelcar, temp);
    //     ModelCarDetails = modelcararray.map((x) => {
    //       return x.value;
    //     });

    //     var yearcar = [];
    //     var temp = document.getElementsByName("CarDetails[Year]");
    //     var yearcararray = [].concat.apply(yearcar, temp);
    //     YearCarDetails = yearcararray.map((x) => {
    //       return x.value;
    //     });

    //     var notele = [];
    //     var temp = document.getElementsByName("TelevisionDetails[Make]");
    //     var maketelearray = [].concat.apply(notele, temp);
    //     var No_packTelevisionDetails = maketelearray.map((x) => {
    //       return x.value;
    //     });

    //     var notele = [];
    //     var temp = document.getElementsByName("TelevisionDetails[Make]");
    //     var makenewtelearray = [].concat.apply(notele, temp);
    //     MakeTelevisionDetails = makenewtelearray.map((x) => {
    //       return x.value;
    //     });

    //     var notele = [];
    //     var temp = document.getElementsByName("TelevisionDetails[Model]");
    //     var modelnewtelearray = [].concat.apply(notele, temp);
    //     ModelTelevisionDetails = modelnewtelearray.map((x) => {
    //       return x.value;
    //     });

    //     var weighttele = [];
    //     var temp = document.getElementsByName("TelevisionDetails[Weight]");
    //     var weighttelearray = [].concat.apply(weighttele, temp);
    //     WeightTelevisionDetails = weighttelearray.map((x) => {
    //       return x.value;
    //     });

    //     var lengthtele = [];
    //     var temp = document.getElementsByName("TelevisionDetails[Length]");
    //     var lengthtelearray = [].concat.apply(lengthtele, temp);
    //     LengthTelevisionDetails = lengthtelearray.map((x) => {
    //       return x.value;
    //     });

    //     var widthtele = [];
    //     var temp = document.getElementsByName("TelevisionDetails[Width]");
    //     var widthtelearray = [].concat.apply(widthtele, temp);
    //     var WidthTelevisionDetails = widthtelearray.map((x) => {
    //       return x.value;
    //     });

    //     var heighttele = [];
    //     var temp = document.getElementsByName("TelevisionDetails[Height]");
    //     var heighttelearray = [].concat.apply(heighttele, temp);
    //     var HeightTelevisionDetails = heighttelearray.map((x) => {
    //       return x.value;
    //     });

    //     var doc = [];
    //     var temp = document.getElementsByName("DocumnetDetails[]");
    //     var docarray = [].concat.apply(doc, temp);
    //     var DocumnetDetails = docarray.map((x) => {
    //       return x.value;
    //     });
    //   }

    //   if (activeIndex == 0) {
    //     console.log("checkindexvalue", activeIndex);

    //     if (
    //       envelope.classList.contains("active") ||
    //       box.classList.contains("active") ||
    //       television.classList.contains("active") ||
    //       furniture.classList.contains("active") ||
    //       auto.classList.contains("active") ||
    //       packageDetails.classList.contains("active")
    //     ) {
    //       stepValidate = true;
    //     } else {
    //       stepValidate = false;
    //       this.setState({
    //         PackageDetailsErr: true,
    //         PackageDetailsErrText: "Please select shipment content2",
    //       });
    //     }
    //   } else if (
    //     activeIndex == 1 &&
    //     this.state.Steps[activeIndex].stepId == "containerdetails"
    //   ) {
    //     this.state.documentData.find((x) => {
    //       if (x === "1") {
    //         for (let i = 0; i < No_packBoxDetails.length; i++) {
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] !== "" &&
    //             LengthBoxDetails[i] != "" &&
    //             WidthBoxDetails[i] !== "" &&
    //             HeightBoxDetails[i] !== ""
    //           ) {
    //             stepValidate = true;
    //           } else {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter correct values",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] == "" &&
    //             LengthBoxDetails[i] == "" &&
    //             WidthBoxDetails[i] == "" &&
    //             HeightBoxDetails[i] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter weight & dimensions",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] !== "" &&
    //             LengthBoxDetails[i] == "" &&
    //             WidthBoxDetails[i] == "" &&
    //             HeightBoxDetails[i] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter  dimensions",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] == "" &&
    //             LengthBoxDetails[i] !== "" &&
    //             WidthBoxDetails[i] !== "" &&
    //             HeightBoxDetails[i] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter weight ",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] == "" &&
    //             WeightBoxDetails[i] !== "" &&
    //             LengthBoxDetails[i] !== "" &&
    //             WidthBoxDetails[i] !== "" &&
    //             HeightBoxDetails[i] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter No. of box  ",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] !== "" &&
    //             LengthBoxDetails[i] !== "" &&
    //             WidthBoxDetails[i] == "" &&
    //             HeightBoxDetails[i] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter Dimensions width & Height",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] !== "" &&
    //             LengthBoxDetails[i] !== "" &&
    //             WidthBoxDetails[i] !== "" &&
    //             HeightBoxDetails[i] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter Dimensions Height",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] !== "" &&
    //             LengthBoxDetails[i] == "" &&
    //             WidthBoxDetails[i] !== "" &&
    //             HeightBoxDetails[i] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter Dimensions length & Height",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] !== "" &&
    //             LengthBoxDetails[i] == "" &&
    //             WidthBoxDetails[i] !== "" &&
    //             HeightBoxDetails[i] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter Dimensions length",
    //             });
    //           }
    //           if (
    //             No_packBoxDetails[i] !== "" &&
    //             WeightBoxDetails[i] !== "" &&
    //             LengthBoxDetails[i] == "" &&
    //             WidthBoxDetails[i] == "" &&
    //             HeightBoxDetails[i] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter Dimensions length & width",
    //             });
    //           }
    //           if (WeightBoxDetails[i] == 0) {
    //             stepValidate = false;
    //             this.setState({
    //               BoxesErr: true,
    //               BoxesErrText: "Please enter correct weight",
    //             });
    //           }
    //         }
    //       }
    //       if (x === "2") {
    //       }
    //       if (x === "3") {
    //       }

    //       if (x === "4") {
    //         for (let k = 0; k < No_packTelevisionDetails.length; k++) {
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] !== "" &&
    //             LengthTelevisionDetails[k] !== "" &&
    //             WidthTelevisionDetails[k] !== "" &&
    //             HeightTelevisionDetails[k] !== ""
    //           ) {
    //             stepValidate = true;
    //           } else {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText: "Please Enter correct values",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] == "" &&
    //             LengthTelevisionDetails[k] == "" &&
    //             WidthTelevisionDetails[k] == "" &&
    //             HeightTelevisionDetails[k] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText:
    //                 "Please Enter Television Weight & Dimensions",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] !== "" &&
    //             LengthTelevisionDetails[k] == "" &&
    //             WidthTelevisionDetails[k] == "" &&
    //             HeightTelevisionDetails[k] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText: "Please Enter Television Dimensions",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] == "" &&
    //             LengthTelevisionDetails[k] !== "" &&
    //             WidthTelevisionDetails[k] !== "" &&
    //             HeightTelevisionDetails[k] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText: "Please Enter Television Weight",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] == "" &&
    //             WeightTelevisionDetails[k] == "" &&
    //             LengthTelevisionDetails[k] !== "" &&
    //             WidthTelevisionDetails[k] !== "" &&
    //             HeightTelevisionDetails[k] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText:
    //                 "Please Enter Television make & Television Weight",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] == "" &&
    //             WeightTelevisionDetails[k] !== "" &&
    //             LengthTelevisionDetails[k] == "" &&
    //             WidthTelevisionDetails[k] == "" &&
    //             HeightTelevisionDetails[k] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText:
    //                 "Please Enter Television make & Television Dimensions",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] !== "" &&
    //             LengthTelevisionDetails[k] !== "" &&
    //             WidthTelevisionDetails[k] == "" &&
    //             HeightTelevisionDetails[k] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText:
    //                 "Please Enter  Television Dimensions width & Height",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] !== "" &&
    //             LengthTelevisionDetails[k] !== "" &&
    //             WidthTelevisionDetails[k] !== "" &&
    //             HeightTelevisionDetails[k] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText:
    //                 "Please Enter  Television Dimensions Height",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] !== "" &&
    //             LengthTelevisionDetails[k] == "" &&
    //             WidthTelevisionDetails[k] == "" &&
    //             HeightTelevisionDetails[k] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText:
    //                 "Please Enter  Television Dimensions length & width ",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] !== "" &&
    //             LengthTelevisionDetails[k] == "" &&
    //             WidthTelevisionDetails[k] !== "" &&
    //             HeightTelevisionDetails[k] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText:
    //                 "Please Enter  Television Dimensions length",
    //             });
    //           }
    //           if (
    //             No_packTelevisionDetails[k] !== "" &&
    //             WeightTelevisionDetails[k] !== "" &&
    //             LengthTelevisionDetails[k] !== "" &&
    //             WidthTelevisionDetails[k] == "" &&
    //             HeightTelevisionDetails[k] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               TelevisionErrText:
    //                 "Please Enter  Television Dimensions width ",
    //             });
    //           }
    //         }
    //       }
    //       if (x === "5") {
    //         for (let j = 0; j < MakeCarDetails.length; j++) {
    //           if (
    //             MakeCarDetails[j] !== "" &&
    //             ModelCarDetails[j] !== "" &&
    //             YearCarDetails[j] !== ""
    //           ) {
    //             stepValidate = true;
    //           } else {
    //             stepValidate = false;
    //             this.setState({
    //               CarErrText: "Please enter correct values",
    //             });
    //           }
    //           if (
    //             MakeCarDetails[j] !== "" &&
    //             ModelCarDetails[j] == "" &&
    //             YearCarDetails[j] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               CarErrText: "Please enter car model & car year",
    //             });
    //           }
    //           if (
    //             MakeCarDetails[j] !== "" &&
    //             ModelCarDetails[j] !== "" &&
    //             YearCarDetails[j] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               CarErrText: "Please enter car year",
    //             });
    //           }
    //           if (
    //             MakeCarDetails[j] !== "" &&
    //             ModelCarDetails[j] == "" &&
    //             YearCarDetails[j] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               CarErrText: "Please enter car model",
    //             });
    //           }
    //           if (
    //             MakeCarDetails[j] == "" &&
    //             ModelCarDetails[j] !== "" &&
    //             YearCarDetails[j] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               CarErrText: "Please enter car make",
    //             });
    //           }
    //           if (
    //             MakeCarDetails[j] == "" &&
    //             ModelCarDetails[j] == "" &&
    //             YearCarDetails[j] !== ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               CarErrText: "Please enter car make & car model",
    //             });
    //           }
    //           if (
    //             MakeCarDetails[j] == "" &&
    //             ModelCarDetails[j] !== "" &&
    //             YearCarDetails[j] == ""
    //           ) {
    //             stepValidate = false;
    //             this.setState({
    //               CarErrText: "Please enter car make & car year",
    //             });
    //           }
    //         }
    //       }
    //     });
    //   } else if (
    //     (activeIndex == 2 &&
    //       this.state.Steps[activeIndex].stepId == "shipmentdetails") ||
    //     (activeIndex == 1 &&
    //       this.state.Steps[activeIndex].stepId == "shipmentdetails")
    //   ) {
    //     if (
    //       document.getElementById("toCountrySelect").value == "" &&
    //       document.getElementById("fromCountrySelect").value == "" &&
    //       this.state.FromZip == "" &&
    //       this.state.ToZip == ""
    //     ) {
    //       stepValidate = false;
    //       cogoToast.error("Please select country");
    //     } else {
    //       if (document.getElementById("toCountrySelect").value == "") {
    //         stepValidate = false;
    //         this.setState({
    //           ToCountryErr: true,
    //           ToCountryErrText: "Please select To Country",
    //         });
    //       } else if (document.getElementById("fromCountrySelect").value == "") {
    //         stepValidate = false;
    //         cogoToast.error("Please select From Country");
    //       } else if (
    //         this.state.hidefromzipcode &&
    //         this.state.FromZip == "" &&
    //         this.state.FromCity !== ""
    //       ) {
    //         stepValidate = false;
    //         this.setState({
    //           FromZipErr: true,
    //           FromZipErrText: "Please enter From Zip",
    //         });
    //       } else if (
    //         this.state.FromSelectedCountry.label === "China" &&
    //         this.state.FromZip == ""
    //       ) {
    //         stepValidate = false;
    //         this.setState({
    //           FromZipErr: true,
    //           FromZipCodeErrText: "Please enter From Zip Code",
    //           FromZipErrText: "Please enter From Zip Code",
    //         });
    //       } else if (
    //         this.state.ToSelectedCountry.label === "China" &&
    //         this.state.ToZip === ""
    //       ) {
    //         stepValidate = false;
    //         this.setState({
    //           ToZipCodeEnterText: "Please enter To Zip Code",
    //         });
    //       } else if (!this.state.FromZipCodeValue) {
    //         this.setState({
    //           FromZipCodeErrText: "Please enter from zip Code",
    //         });
    //       } else if (
    //         this.state.hidetozipcode &&
    //         this.state.ToZip === "" &&
    //         this.state.ToCity !== ""
    //       ) {
    //         stepValidate = false;
    //         this.setState({
    //           ToZipCodeEnterText: "Please enter To Zip",
    //         });
    //       } else if (this.state.ToSelectedCountry.value === 37) {
    //         if (
    //           this.state.ToZip.length < 5 ||
    //           /[^A-Za-z@.0-9\d]/.test(this.state.ToZip)
    //         ) {
    //           stepValidate = false;
    //           this.setState({
    //             ToZipCodeEnterErr: true,
    //             ToZipCodeEnterText:
    //               "Please enter the zip code at list 5 character",
    //           });
    //         }
    //       } else if (
    //         this.state.FromCity == "" &&
    //         this.state.FromIsFedxCity === 0 &&
    //         this.state.ThankyouPageMoveFromZip == false &&
    //         this.state.FromSelectedCountry.label !== "China"
    //       ) {
    //         stepValidate = false;
    //         this.setState({
    //           FromCityErr: true,
    //           FromCityErrText: "Please enter from city",
    //         });
    //       } else if (
    //         this.state.FromSelectedCountry.label === "China" &&
    //         CommonConfig.isEmpty(this.state.FromFedExSelectedCity)
    //       ) {
    //         stepValidate = false;
    //         this.setState({
    //           FromCityErr: true,
    //           FromCityErrText: "Please enter from city",
    //         });
    //       } else if (
    //         this.state.ToCity == "" &&
    //         this.state.ToIsFedxCity === 0 &&
    //         this.state.ThankyouPageMoveToZip == false &&
    //         this.state.ToSelectedCountry.label !== "China"
    //       ) {
    //         stepValidate = false;
    //         this.setState({
    //           ToCityErr: true,
    //           ToCityErrText: "Please Enter To city",
    //         });
    //       } else if (
    //         this.state.ToSelectedCountry.label === "China" &&
    //         CommonConfig.isEmpty(this.state.ToFedExSelectedCity)
    //       ) {
    //         stepValidate = false;
    //         this.setState({
    //           ToCityErr: true,
    //           ToCityErrText: "Please Enter To city",
    //         });
    //       } else {
    //         stepValidate = true;
    //       }
    //     }
    //   } else if (
    //     (activeIndex == 2 &&
    //       this.state.Steps[activeIndex].stepId == "shipperdetails") ||
    //     (activeIndex == 3 &&
    //       this.state.Steps[activeIndex].stepId == "shipperdetails")
    //   ) {
    //     debugger; //kk
    //     /// if (activeIndex == 5) {
    //     if (
    //       // this.state.ContactName == "" &&
    //       // this.state.PhoneNumber == "" &&
    //       // this.state.email == "" &&
    //       // !emailRegex.test(this.state.email)
    //       this.state.LocationStatus === "Active"
    //     ) {
    //       if (allValid === true) {
    //         this.setState({
    //           cnameErrText: "",
    //           ContactNumberErrText: "",
    //           EmailErrText: "",
    //         });
    //       } else {
    //         stepValidate = false;
    //         allValid = false;
    //         this.setState({
    //           cnameErrText: "Please enter contact name",
    //           ContactNumberErrText: "Please enter phone number",
    //           EmailErrText: "Please enter email",
    //         });
    //       }
    //     } else if (
    //       (this, this.state.ContactName == "" && this.state.PhoneNumber == "")
    //     ) {
    //       stepValidate = false;
    //       allValid = false;
    //       this.setState({
    //         // cnameErrText: "Please enter contact name",
    //         // ContactNumberErrText: "Please enter phone number",
    //       });
    //     } else if (
    //       (this,
    //       this.state.PhoneNumber == "" &&
    //         this.state.email == "" &&
    //         !emailRegex.test(this.state.email))
    //     ) {
    //       stepValidate = false;
    //       allValid = false;
    //       this.setState({
    //         ContactNumberErrText: "Please enter phone number",
    //         EmailErrText: "Please enter email",
    //       });
    //       stepValidate = false;
    //       allValid = false;
    //     } else if (this.state.email == "" && this.state.ContactName == "") {
    //       stepValidate = false;
    //       this.setState({
    //         cnameErrText: "Please enter contact name",
    //         EmailErrText: "Please enter email",
    //       });
    //     } else if ((this, this.state.email == "")) {
    //       stepValidate = false;
    //       allValid = false;
    //       this.setState({
    //         EmailErrText: "Please enter email",
    //       });
    //     } else if (this.state.ContactName == "") {
    //       stepValidate = false;
    //       allValid = false;
    //       this.setState({
    //         cnameErrText: "Please enter contact name",
    //       });
    //     } else if (this.state.PhoneNumber == "") {
    //       stepValidate = false;
    //       allValid = false;
    //       this.setState({
    //         ContactNumberErrText: "Please enter phone number",
    //       });
    //       stepValidate = false;
    //       allValid = false;
    //     } else {
    //       if (!emailRegex.test(this.state.email)) {
    //         stepValidate = false;
    //         allValid = false;
    //       } else {
    //         stepValidate = true;
    //         allValid = true;
    //       }
    //     }
    //     //} //kj
    //   }
    //   if (
    //     (activeIndex == 2 &&
    //       this.state.Steps[activeIndex].stepId == "shipperdetails") ||
    //     (activeIndex == 3 &&
    //       this.state.Steps[activeIndex].stepId == "shipperdetails")
    //   ) {
    //     if (allValid) {
    //       if (key !== activeIndex) {
    //         this.setState({ NextButtonIdx: key });
    //         stepsList[key]["classname"] = "active";
    //         stepsList[activeIndex]["classname"] = "inactive";
    //         this.setState({ Steps: stepsList });
    //         let divID = stepsList[key]["stepId"];
    //         let activeDiv = stepsList[activeIndex]["stepId"];
    //         document.getElementById(divID).style.display = "block";
    //         document.getElementById(activeDiv).style.display = "none";
    //       }
    //     } else {
    //       stepValidate = false;
    //     }
    //   } else {
    //     if (stepValidate) {
    //       if (key !== activeIndex) {
    //         this.setState({ NextButtonIdx: key });
    //         stepsList[key]["classname"] = "active";
    //         stepsList[activeIndex]["classname"] = "inactive";
    //         this.setState({ Steps: stepsList });
    //         let divID = stepsList[key]["stepId"];
    //         let activeDiv = stepsList[activeIndex]["stepId"];
    //         document.getElementById(divID).style.display = "block";
    //         document.getElementById(activeDiv).style.display = "none";
    //       }
    //     }
    //     this.nextStep();
    //   }
    // }
    // if (
    //   this.state.showBoxDetails === false &&
    //   this.state.showTVDetails === false &&
    //   this.state.showCarDetails === false &&
    //   this.state.ShowEnvelop === false &&
    //   this.state.Showfurniture === false
    // ) {
    //   document.getElementById("referrederror").style.display = "block";
    //   // this.handleError();
    //   // return;
    //   this.setState({
    //     erorrmsg: "Please select shipment content1",
    //   });
    //   return;
    // } else {
    //   document.getElementById("referrederror").style.display = "none";
    // }
  };
  render() {
    const { allpackagesValue, submitList, allAutoValue, allTelevisionValue } =
      this.state;
    const dataaa = "Hello from ParentComponent!";
    const AllRatesDetails = this.state.AllRatesDetails;
    var ToFedExCityListDisplay = this.state.ToFedExCityList.map((city) => {
      return { value: city.CityCode, label: city.CityName };
    });
    var FromFedExCityListDisplay = this.state.FromFedExCityList.map((city) => {
      return { value: city.CityCode, label: city.CityName };
    });

    console.log(
      "checkweightdataaaa1",

      this.state.PackageStatusValue
    );
    console.log(
      "AllPackaeseArry",
      this.state.FromSelectedCountry.label === "United States"
    );

    return (
      <div className="get-quote-wrap">
        {this.state.getRatesModule === true ? (
          <GetRate AllRatesDetails={AllRatesDetails} dataaa={dataaa} />
        ) : null}

        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}

        <div className="quote-header">
          <div className="container">
            <div className="header-inner">
              <div className="logo">
                <a href={productiourl}>
                  <img src={logoImage} alt="SFL Worldwide" />
                </a>
              </div>
              <div className="header-main-menu">
                <ul>
                  <li>
                    <a href="https://www.sflworldwide.com/track-shipment/">
                      Tracking
                    </a>
                  </li>
                  <li>
                    <a href="https://hub.sflworldwide.com/">Book Shipment</a>
                  </li>
                  <li>
                    <a href="https://www.sflworldwide.com/contact-us">
                      Contact Us
                    </a>
                  </li>
                  <li className="head-contact-no">
                    <a href="#">
                      <img src={HeadContact}></img>
                      <label>1-800-691-2335</label>
                    </a>
                  </li>
                  <li className="head-get-quote">
                    <a href="https://rates.sflworldwide.com/">
                      <img src={HeadGetQuote}></img>
                      <label>Get Quote</label>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="header-right">
                <ul>
                  <li>
                    <a href="#">
                      <img src={HeadUser}></img>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img src={HeadSearch}></img>
                    </a>
                  </li>
                  <li className="head-menu-outer">
                    <a href="#">
                      <img src={HeadMenu}></img>
                    </a>
                  </li>
                </ul>
                {/* <a onClick={() => this.urlclick()}>
                  <img src={backIcon} alt="Back" />
                  Back to Home
                </a> */}
              </div>
            </div>
          </div>
        </div>
        <div className="wizard-outer">
          <div className="container">
            <div className="wizard-top-section" id="nave">
              <ul>
                {/* <li className="active" value="1" id="step1">
                  {this.state.nextStepValue === null ? (
                    <img src={Step1}></img>
                  ) : (
                    <img src={tickIcon}></img>
                  )}

                  <div className="step-inner">
                    <span>Step 1</span>
                    <label>Select Package</label>
                  </div>
                </li> */}
                <li className="active" value="3" id="step3">
                  {this.state.nextStepValue === null ? (
                    <img src={Step3}></img>
                  ) : (
                    <img src={tickIcon}></img>
                  )}

                  <div className="step-inner">
                    <span>Step 1</span>

                    <label>Location</label>
                  </div>
                </li>
                <li className="" value="1" id="step1">
                  {this.state.PackageStatus === null ? (
                    <img src={Step1}></img>
                  ) : (
                    <img src={tickIcon}></img>
                  )}

                  <div className="step-inner">
                    <span>Step 2</span>
                    <label>Select Package</label>
                  </div>
                </li>
                <li className="" value="2" id="step2">
                  {this.state.ContactStatus === null ? (
                    <img src={Step2}></img>
                  ) : (
                    <img src={tickIcon}></img>
                  )}

                  <div className="step-inner">
                    <span>Step 3</span>
                    <label>Package Details</label>
                  </div>
                </li>
                {/* <li className="" value="3" id="step3">
                  {this.state.LocationStatus === null &&
                  this.state.LastStatus === null ? (
                    <img src={Step3}></img>
                  ) : (
                    <img src={tickIcon}></img>
                  )}

                  <div className="step-inner">
                    {this.state.SelectedPakage === "envelope" ? (
                      <span>Step 2</span>
                    ) : (
                      <span>Step 3</span>
                    )}
                    <label>Location</label>
                  </div>
                </li> */}
                <li className="" value="4" id="step4">
                  <img src={Step4}></img>
                  <div className="step-inner">
                    {this.state.SelectedPakage === "envelope" ? (
                      <span>Step 3</span>
                    ) : (
                      <span>Step 4</span>
                    )}
                    <label>Contact</label>
                  </div>
                </li>
              </ul>
            </div>

            {this.state.nextStepValue === null ? (
              <div
                className="Package-details-outer step3"
                id="shipperdetails"
                //style={{ display: "none" }}
              >
                <div className="box-outer section-1">
                  <div className="cst-row">
                    <div className="input-outer input-select col-6">
                      <label>Sending from</label>
                      <Select
                        className="from-country-div"
                        classNamePrefix="frn-select"
                        id="fromCountrySelect"
                        options={this.state.CountryListValue}
                        isSearchable="true"
                        onChange={(e) => {
                          this.handleSelect(e, "from");
                        }}
                        value={
                          this.state.SelectedOption
                            ? this.state.SelectedOption
                            : this.state.USSelectedOption
                        }
                        filterOptions={this.handleFilter}
                      ></Select>
                    </div>

                    {this.state.FromSelectedCountry.label ===
                    "United States" ? (
                      <div className="input-outer col-6">
                        <label>From Zip Code</label>
                        <div className="ipt-with-icon icn-left">
                          <input
                            id="fromzipSelect"
                            type="text"
                            maxLength={7}
                            autoComplete="off"
                            role="presentation"
                            onKeyUp={(e) => this.ChangeFromZipUS(e)}
                            placeholder=" from Zip Code"
                            onFocus={() =>
                              this.setState({
                                FromZipErr: false,
                                FromZipErrText: "",
                                FromZipNotFoundErrText: "",
                              })
                            }
                            onChange={(e) =>
                              this.setState({
                                FromZipCodeValue: e.target.value,
                              })
                            }
                          ></input>
                          <span className="ipt-icn"></span>
                        </div>

                        <FormHelperText style={{ color: "red" }}>
                          {this.state.FromZipCodeErrText}
                        </FormHelperText>
                      </div>
                    ) : this.state.FromSelectedCountry.label === "China" ? (
                      <div className="input-outer col-6">
                        <div className="cst-row">
                          <div className="col-6">
                            <label>From Zip Code</label>
                            <div className="ipt-with-icon icn-left">
                              <input
                                id="fromzipSelect"
                                type="text"
                                maxLength={7}
                                autoComplete="off"
                                role="presentation"
                                onKeyUp={(e) => this.ChangeFromZipUS(e)}
                                placeholder=" from Zip Code"
                                onFocus={() =>
                                  this.setState({
                                    FromZipErr: false,
                                    FromZipErrText: "",
                                    FromZipNotFoundErrText: "",
                                  })
                                }
                                onChange={(e) =>
                                  this.setState({
                                    FromZipCodeValue: e.target.value,
                                  })
                                }
                              ></input>
                              <span className="ipt-icn"></span>
                            </div>
                            <FormHelperText style={{ color: "red" }}>
                              {this.state.FromZipCodeErr}
                            </FormHelperText>
                            <FormHelperText style={{ color: "red" }}>
                              {this.state.FromZipCodeErr}
                            </FormHelperText>
                          </div>
                          <div className="col-6">
                            <div className="input-outer input-select">
                              <Select
                                className="from-country-div"
                                classNamePrefix="frn-select"
                                id="fromCitySelect"
                                options={FromFedExCityListDisplay}
                                isSearchable="true"
                                // value={this.state.FromFedExCityValue}
                                onFocus={(e) =>
                                  this.handleChange_Value1("FromFedExCity")
                                }
                                onBlur={(e) =>
                                  this.handleChange_Value1("FromFedExCity")
                                }
                                onChange={(event, value) =>
                                  this.ChangeFromCity(value, "FedEx")
                                }
                              ></Select>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : this.state.FromIsFedxCity === 1 ? (
                      <div className="input-outer input-select col-6">
                        <div className="top-sp">
                          <Select
                            className="from-country-div"
                            classNamePrefix="frn-select"
                            id="fromCitySelect"
                            options={this.state.FromFedExCityOptionValue}
                            isSearchable="true"
                            onChange={(e) => {
                              this.ChangeFromCity(e, "FedEx1");
                            }}
                            value={this.state.FromFedExCityValue}
                          ></Select>
                        </div>
                        <FormHelperText style={{ color: "red" }}>
                          {this.state.FromFedExCityValueErr}
                        </FormHelperText>
                      </div>
                    ) : (
                      <div className="input-outer col-6">
                        <label>From Zip Code</label>
                        <div className="ipt-with-icon icn-left">
                          <input
                            id="fromzipSelect"
                            type="text"
                            maxLength={7}
                            autoComplete="off"
                            role="presentation"
                            onKeyUp={(e) => this.ChangeFromZipUS(e)}
                            placeholder=" from Zip Code"
                            onFocus={() =>
                              this.setState({
                                FromZipErr: false,
                                FromZipErrText: "",
                                FromZipNotFoundErrText: "",
                                FromZipCodeErrText: "",
                              })
                            }
                            onChange={(e) =>
                              this.setState({
                                FromZipCodeValue: e.target.value,
                              })
                            }
                          ></input>
                          <span className="ipt-icn"></span>
                        </div>
                        <FormHelperText style={{ color: "red" }}>
                          {this.state.FromZipCodeErr}
                        </FormHelperText>
                      </div>
                    )}
                  </div>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.ShipmentErr}
                  </FormHelperText>
                </div>
                <div className="box-outer section-2 ">
                  <div className="cst-row">
                    <div className="input-outer input-select col-6">
                      <label>Sending to</label>
                      <Select
                        className="from-country-div"
                        classNamePrefix="frn-select"
                        id="toCountrySelect"
                        options={this.state.CountryListValue}
                        isSearchable="true"
                        onChange={(e) => {
                          this.handleSelect(e, "to");
                        }}
                        value={
                          this.state.ToSelectedCountry?.label
                            ? this.state.ToSelectedCountry
                            : this.state.SelectedOptionTo
                        }
                        filterOptions={this.handleFilter}
                      ></Select>
                    </div>
                    {this.state.ToSelectedCountry.label === "United States" ? (
                      <div className="input-outer col-6">
                        <label>To Zip Code</label>
                        <div className="ipt-with-icon icn-left">
                          <input
                            id="TozipSelect"
                            type="text"
                            maxLength={7}
                            autoComplete="off"
                            role="presentation"
                            hidden={
                              Object.keys(this.state.ToSelectedCountry)
                                .length === 0
                                ? "hidden"
                                : ""
                            }
                            onKeyUp={(e) => this.ChangeToZipUS(e)}
                            placeholder="To Zip Code"
                            onFocus={() =>
                              this.setState({
                                ToZipCodeErr: false,
                                ToZipCodeHelperText: "",
                                ToZipCodeEnterText: "",
                              })
                            }
                          ></input>
                          <span className="ipt-icn"></span>
                        </div>
                        <FormHelperText>
                          {this.state.ToZipCodeHelperText}
                        </FormHelperText>
                        <FormHelperText style={{ color: "red" }}>
                          {this.state.ToZipErrText}
                        </FormHelperText>
                        <FormHelperText style={{ color: "red" }}>
                          {this.state.ToZipCodeEnterText}
                        </FormHelperText>
                      </div>
                    ) : this.state.ToSelectedCountry.label === "China" ? (
                      <div className="input-outer col-6">
                        <div className="cst-row">
                          <div className="input-outer col-6">
                            <label>To Zip Code</label>
                            <div className="ipt-with-icon icn-left">
                              <input
                                id="TozipSelect"
                                type="text"
                                maxLength={7}
                                autoComplete="off"
                                role="presentation"
                                hidden={
                                  Object.keys(this.state.ToSelectedCountry)
                                    .length === 0
                                    ? "hidden"
                                    : ""
                                }
                                onKeyUp={(e) => this.ChangeToZipUS(e)}
                                placeholder="To Zip Code"
                                onFocus={() =>
                                  this.setState({
                                    ToZipCodeErr: false,
                                    ToZipCodeHelperText: "",
                                    ToZipCodeEnterText: "",
                                  })
                                }
                              ></input>
                              <span class="ipt-icn"></span>
                            </div>
                            <FormHelperText>
                              {this.state.ToZipCodeHelperText}
                            </FormHelperText>
                            <FormHelperText style={{ color: "red" }}>
                              {this.state.ToZipErrText}
                            </FormHelperText>
                            <FormHelperText style={{ color: "red" }}>
                              {this.state.ToZipCodeEnterText}
                            </FormHelperText>
                          </div>
                          <div className="input-outer col-6">
                            <div className="input-outer input-select">
                              <Autocomplete
                                options={ToFedExCityListDisplay}
                                id="toCitySelect"
                                getOptionLabel={(option) => option.label}
                                value={this.state.ToFedExCityValue}
                                autoSelect
                                hidden={
                                  Object.keys(this.state.ToSelectedCountry)
                                    .length === 0
                                    ? "hidden"
                                    : ""
                                }
                                onFocus={(e) =>
                                  this.handleChange_Value1("FromFedExCity")
                                }
                                onBlur={(e) =>
                                  this.handleChange_Value1("ToFedExCity")
                                }
                                onChange={(event, value) =>
                                  this.ChangeToCity(value, "FedEx")
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select City"
                                    fullWidth
                                    error={this.state.ToCityErr}
                                    helperText={this.state.ToCityErrText}
                                    variant="outlined"
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : this.state.ToIsFedxCity === 1 ? (
                      <div className="input-outer input-select col-6">
                        <div className="top-sp">
                          <Select
                            className="from-country-div"
                            classNamePrefix="frn-select"
                            id="toCitySelect"
                            options={this.state.ToFedExCityOptionValue}
                            isSearchable="true"
                            onChange={(e) => {
                              this.ChangeToCity(e, "FedEx1");
                            }}
                            value={this.state.ToFedExCityValue}
                          ></Select>
                        </div>
                        <FormHelperText style={{ color: "red" }}>
                          {this.state.ToZipCodeValueErr}
                        </FormHelperText>
                      </div>
                    ) : this.state.ToSelectedCountry.label != "" ? (
                      <div className="input-outer col-6">
                        <div className="top-sp">
                          <div className="ipt-with-icon icn-left">
                            <input
                              id="TozipSelect"
                              type="text"
                              maxLength={7}
                              autoComplete="off"
                              role="presentation"
                              hidden={
                                Object.keys(this.state.ToSelectedCountry)
                                  .length === 0
                                  ? "hidden"
                                  : ""
                              }
                              onKeyUp={(e) => this.ChangeToZipUS(e)}
                              placeholder="To Zip Code"
                              onFocus={() =>
                                this.setState({
                                  ToZipCodeErr: false,
                                  ToZipCodeHelperText: "",
                                  ToZipCodeEnterText: "",
                                })
                              }
                            ></input>
                            {this.state.ToSelectedCountry.label == "" ? (
                              ""
                            ) : (
                              <span className="ipt-icn"></span>
                            )}
                          </div>
                        </div>
                        <FormHelperText>
                          {this.state.ToZipCodeHelperText}
                        </FormHelperText>
                        <FormHelperText style={{ color: "red" }}>
                          {this.state.ToZipErrText}
                        </FormHelperText>
                        <FormHelperText style={{ color: "red" }}>
                          {this.state.ToZipCodeEnterText}
                        </FormHelperText>
                      </div>
                    ) : null}
                    <div className="resident-check">
                      <input
                        type="checkbox"
                        onChange={(e) => this.isResidenceChange(e)}
                      />{" "}
                      I'm shipping to a residence
                    </div>
                  </div>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.ToStateCodeValueErr}
                  </FormHelperText>
                </div>
              </div>
            ) : (
              // <div className="wizard-main-section step1">
              //   <h2>Select Types of package</h2>
              //   <ul>
              //     <li
              //       className=""
              //       value="2"
              //       id="envelope"
              //       onClick={(e) =>
              //         this.packageDetailsChange(e, "2", "envelope")
              //       }
              //       href=""
              //     >
              //       <a>
              //         <span className="icn-wrap">
              //           <img className="df-icon" src={Envelop}></img>
              //           <img className="active-icon" src={envelopActive}></img>
              //         </span>
              //         <label>Envelop</label>
              //       </a>
              //     </li>
              //     <li
              //       className=""
              //       id="box"
              //       value="1"
              //       onClick={(e) => this.packageDetailsChange(e, "1", "box")}
              //       href=""
              //     >
              //       <a>
              //         <span className="icn-wrap">
              //           <img className="df-icon" src={Boxes}></img>
              //           <img className="active-icon" src={boxesActive}></img>
              //         </span>
              //         <label>Boxes</label>
              //       </a>
              //     </li>
              //     <li
              //       className=""
              //       id="television"
              //       value="4"
              //       onClick={(e) =>
              //         this.packageDetailsChange(e, "4", "television")
              //       }
              //       href=""
              //     >
              //       <a>
              //         <span className="icn-wrap">
              //           <img className="df-icon" src={Television}></img>
              //           <img
              //             className="active-icon"
              //             src={televisionActive}
              //           ></img>
              //         </span>
              //         <label>Television</label>
              //       </a>
              //     </li>
              //     <li
              //       className=""
              //       id="furniture"
              //       value="3"
              //       onClick={(e) =>
              //         this.packageDetailsChange(e, "3", "furniture")
              //       }
              //       href=""
              //     >
              //       <a>
              //         <span className="icn-wrap">
              //           <img className="df-icon" src={Furniture}></img>
              //           <img
              //             className="active-icon"
              //             src={furnitureActive}
              //           ></img>
              //         </span>
              //         <label>Furniture</label>
              //       </a>
              //     </li>
              //     <li
              //       className=""
              //       id="auto"
              //       value="5"
              //       onClick={(e) => this.packageDetailsChange(e, "5", "auto")}
              //       href=""
              //     >
              //       <a>
              //         <span className="icn-wrap">
              //           <img className="df-icon" src={Auto}></img>
              //           <img className="active-icon" src={autoActive}></img>
              //         </span>
              //         <label>Auto</label>
              //       </a>
              //     </li>
              //   </ul>
              // </div>
              false
            )}
            <FormHelperText style={{ color: "red" }} id="referrederror">
              {this.state.erorrmsg}
            </FormHelperText>

            <div
              className="wizard-main-section step1"
              id="packagedetails"
              style={{ display: "none" }}
            >
              <h2>Select Types of package</h2>
              <ul>
                <li
                  className=""
                  value="2"
                  id="envelope"
                  onClick={(e) => this.packageDetailsChange(e, "2", "envelope")}
                  href=""
                >
                  <a>
                    <span className="icn-wrap">
                      <img className="df-icon" src={Envelop}></img>
                      <img className="active-icon" src={envelopActive}></img>
                    </span>
                    <label>Envelop</label>
                  </a>
                </li>
                <li
                  className=""
                  id="box"
                  value="1"
                  onClick={(e) => this.packageDetailsChange(e, "1", "box")}
                  href=""
                >
                  <a>
                    <span className="icn-wrap">
                      <img className="df-icon" src={Boxes}></img>
                      <img className="active-icon" src={boxesActive}></img>
                    </span>
                    <label>Boxes</label>
                  </a>
                </li>
                <li
                  className=""
                  id="television"
                  value="4"
                  onClick={(e) =>
                    this.packageDetailsChange(e, "4", "television")
                  }
                  href=""
                >
                  <a>
                    <span className="icn-wrap">
                      <img className="df-icon" src={Television}></img>
                      <img className="active-icon" src={televisionActive}></img>
                    </span>
                    <label>Television</label>
                  </a>
                </li>
                <li
                  className=""
                  id="furniture"
                  value="3"
                  onClick={(e) =>
                    this.packageDetailsChange(e, "3", "furniture")
                  }
                  href=""
                >
                  <a>
                    <span className="icn-wrap">
                      <img className="df-icon" src={Furniture}></img>
                      <img className="active-icon" src={furnitureActive}></img>
                    </span>
                    <label>Furniture</label>
                  </a>
                </li>
                <li
                  className=""
                  id="auto"
                  value="5"
                  onClick={(e) => this.packageDetailsChange(e, "5", "auto")}
                  href=""
                >
                  <a>
                    <span className="icn-wrap">
                      <img className="df-icon" src={Auto}></img>
                      <img className="active-icon" src={autoActive}></img>
                    </span>
                    <label>Auto</label>
                  </a>
                </li>
              </ul>
            </div>

            <FormHelperText style={{ color: "red" }} id="referrederror">
              {this.state.erorrmsg}
            </FormHelperText>

            <div
              className="Package-details-outer step2"
              id="shipmentdetails"
              style={{ display: "none" }}
            >
              {this.state.showBoxDetails === true ? (
                <div className="box-outer section-1 box-white">
                  <h2>Box Details</h2>
                  <div className="bx-wrap">
                    {allpackagesValue.map((el, i) => (
                      <div key={i} className="cst-row">
                        <div className="input-outer col-1">
                          {i ? <label></label> : <label>No. of Boxes</label>}

                          {/* <Select
                            style={{
                              height: "50px",
                              width: "100%",
                              borderRadius: "5px",
                              placeholder: "1",
                            }}
                            options={this.state.noOfBoxinPackeges}
                            isSearchable="true"
                            name="Quantity"
                            value={el.Quantity || ""}
                            onChange={(e) => this.getBoxesData(e)}
                          ></Select> */}
                          <select
                            style={{
                              height: "50px",
                              width: "100%",
                              borderRadius: "5px",
                              placeholder: "1",
                            }}
                            // name="BoxDetails[No_Pack]"

                            placeholder={`No_Pack`}
                            name="Quantity"
                            value={el.Quantity || ""}
                            onChange={(e) => this.getBoxesData(i, e)}
                          >
                            {this.getNumberofBox()}
                          </select>
                        </div>
                        <div className="input-outer col-1">
                          {i ? <label></label> : <label>Weight</label>}
                          <div className="ipt-with-icon">
                            <input
                              type="number"
                              maxLength={3}
                              autoComplete="off"
                              role="presentation"
                              // onFocus={() =>
                              //   this.setState({
                              //     BoxesErrText: "bbbb11",
                              //   })
                              // }
                              placeholder={`Weight`}
                              name="ActualWeight"
                              value={el.ActualWeight || ""}
                              // onChange={(e) => this.getBoxesData(i, e)}

                              // onChange={(e) =>
                              //   this.getBoxesData(i, e),
                              //   this.setState({
                              //     BoxWeightvalue: e.target.value,
                              //   })
                              // }
                              onChange={(e) => {
                                e.target.value.length <= 3 &&
                                  this.getBoxesData(i, e);
                                this.setState({
                                  BoxWeightvalue: e.target.value,
                                });
                              }}
                            ></input>
                            <span>LBS</span>
                          </div>
                        </div>
                        <div className="input-outer col-3">
                          {i ? (
                            <label></label>
                          ) : (
                            <label>Dimensions (Inches)</label>
                          )}
                          <div className="input-inner">
                            <input
                              className="first-input"
                              type="number"
                              maxLength={3}
                              autoComplete="off"
                              role="presentation"
                              onFocus={() =>
                                this.setState({
                                  BoxesErrText: "",
                                })
                              }
                              placeholder={`Length`}
                              name="DimensionL"
                              value={el.DimensionL || ""}
                              // onChange={(e) => this.getBoxesData(i, e)}
                              onChange={(e) => {
                                e.target.value.length <= 3 &&
                                  this.getBoxesData(i, e);
                                this.setState({
                                  BoxDimantionLengthValue: e.target.value,
                                });
                              }}
                            ></input>

                            <span>X</span>
                          </div>

                          <div className="input-inner">
                            <input
                              type="number"
                              maxLength={3}
                              autoComplete="off"
                              role="presentation"
                              onFocus={() =>
                                this.setState({
                                  BoxesErrText: "",
                                })
                              }
                              placeholder={`Width`}
                              name="DimensionW"
                              value={el.DimensionW || ""}
                              // onChange={(e) => this.getBoxesData(i, e)}
                              onChange={(e) => {
                                e.target.value.length <= 3 &&
                                  this.getBoxesData(i, e);
                                this.setState({
                                  BoxDimantionWidthValue: e.target.value,
                                });
                              }}
                            ></input>

                            <span>X</span>
                          </div>

                          <div className="input-inner">
                            <input
                              className="last-input"
                              type="number"
                              maxLength={3}
                              autoComplete="off"
                              role="presentation"
                              onFocus={() =>
                                this.setState({
                                  BoxesErrText: "",
                                })
                              }
                              placeholder={`Height`}
                              name="DimensionH"
                              value={el.DimensionH || ""}
                              // onChange={(e) => this.getBoxesData(i, e)}
                              onChange={(e) => {
                                e.target.value.length <= 3 &&
                                  this.getBoxesData(i, e);
                                this.setState({
                                  BoxDimantionHeightValue: e.target.value,
                                });
                              }}
                            ></input>
                          </div>
                        </div>

                        <div className="button-outer col-50">
                          <a className=" plus-btn ">
                            <img
                              className="disktop"
                              src={AddBtn}
                              id={this.statenewBoxID}
                              onClick={this.addBoxes}
                              // onClick={(e) => this.addItem("box")}
                            ></img>
                            <img
                              className="mobile-add-icon"
                              src={mobileAddBtn}
                              onClick={this.addBoxes}
                            ></img>
                          </a>
                          {i ? (
                            <a className="delete-btn">
                              {i ? (
                                <img
                                  className="disktop"
                                  src={DeleteBtn}
                                  // onClick={(e) => this.deleteItem("box")}
                                  onClick={() => this.removeBoxes(i)}
                                ></img>
                              ) : (
                                <img></img>
                              )}
                              {i ? (
                                <img
                                  className="mobile-delete-icon"
                                  src={mobileDelet}
                                  onClick={() => this.removeBoxes(i)}
                                ></img>
                              ) : (
                                <img></img>
                              )}
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}

              {this.state.showTVDetails === true ? (
                <div className="box-outer section-2 box-white">
                  <h2>Television</h2>
                  <div className="bx-wrap">
                    {allTelevisionValue.map((el, i) => (
                      <div key={i} className="cst-row">
                        <div className="input-outer col-1">
                          {i ? <label></label> : <label>Brand Name</label>}
                          <input
                            type="text"
                            autoComplete="off"
                            role="presentation"
                            onFocus={() =>
                              this.setState({
                                TelevisionErrText: "",
                              })
                            }
                            placeholder={`Brand Name`}
                            name="TVMake"
                            value={el.TVMake || ""}
                            // onChange={(e) => this.getTelevisionData(i, e)}
                            onChange={(e) => {
                              this.getTelevisionData(i, e);
                              this.setState({
                                TelBrandName: e.target.value,
                              });
                            }}
                          ></input>
                        </div>
                        <div className="input-outer col-1">
                          {i ? <label></label> : <label>Model</label>}
                          <input
                            type="text"
                            autoComplete="off"
                            role="presentation"
                            onFocus={() =>
                              this.setState({
                                TelevisionErrText: "",
                              })
                            }
                            placeholder={`Model`}
                            name="TVModel"
                            value={el.TVModel || ""}
                            // onChange={(e) => this.getTelevisionData(i, e)}
                            onChange={(e) => {
                              this.getTelevisionData(i, e);
                              this.setState({
                                TelModel: e.target.value,
                              });
                            }}
                          ></input>
                        </div>
                        <div className="input-outer col-1">
                          {i ? <label></label> : <label>Weight</label>}
                          <div className="ipt-with-icon">
                            <input
                              type="number"
                              maxLength={3}
                              autoComplete="off"
                              role="presentation"
                              onFocus={() =>
                                this.setState({
                                  TelevisionErrText: "",
                                })
                              }
                              placeholder={`Weight`}
                              name="ActualWeight"
                              value={el.ActualWeight || ""}
                              // onChange={(e) => this.getTelevisionData(i, e)}
                              onChange={(e) => {
                                e.target.value.length <= 3 &&
                                  this.getTelevisionData(i, e);
                                this.setState({
                                  TelWeight: e.target.value,
                                });
                              }}
                            ></input>
                            <span>LBS</span>
                          </div>
                        </div>
                        <div className="input-outer col-3">
                          {i ? (
                            <label></label>
                          ) : (
                            <label>Dimensions (Inches)</label>
                          )}
                          <div className="input-inner">
                            <input
                              className="first-input"
                              type="number"
                              maxLength={3}
                              autoComplete="off"
                              role="presentation"
                              onFocus={() =>
                                this.setState({
                                  TelevisionErrText: "",
                                })
                              }
                              placeholder={`Length`}
                              name="DimensionL"
                              value={el.DimensionL || ""}
                              // onChange={(e) => this.getTelevisionData(i, e)}
                              onChange={(e) => {
                                e.target.value.length <= 3 &&
                                  this.getTelevisionData(i, e);
                                this.setState({
                                  TelDLength: e.target.value,
                                });
                              }}
                            ></input>

                            <span>X</span>
                          </div>
                          <div className="input-inner">
                            <input
                              type="number"
                              maxLength={3}
                              autoComplete="off"
                              role="presentation"
                              onFocus={() =>
                                this.setState({
                                  TelevisionErrText: "",
                                })
                              }
                              placeholder={`Weight`}
                              name="DimensionW"
                              value={el.DimensionW || ""}
                              // onChange={(e) => this.getTelevisionData(i, e)}
                              onChange={(e) => {
                                e.target.value.length <= 3 &&
                                  this.getTelevisionData(i, e);
                                this.setState({
                                  TelDWeight: e.target.value,
                                });
                              }}
                            ></input>

                            <span>X</span>
                          </div>
                          <div className="input-inner">
                            <input
                              className="last-input"
                              type="number"
                              maxLength={3}
                              autoComplete="off"
                              role="presentation"
                              onFocus={() =>
                                this.setState({
                                  TelevisionErrText: "",
                                })
                              }
                              placeholder={`Height`}
                              name="DimensionH"
                              value={el.DimensionH || ""}
                              // onChange={(e) => this.getTelevisionData(i, e)}
                              onChange={(e) => {
                                e.target.value.length <= 3 &&
                                  this.getTelevisionData(i, e);
                                this.setState({
                                  TelDHeight: e.target.value,
                                });
                              }}
                            ></input>
                          </div>
                        </div>

                        <div className="button-outer col-50">
                          <a className="plus-btn disktop">
                            <img
                              className="disktop"
                              src={AddBtn}
                              onClick={this.addTelevision}
                            ></img>
                            <img
                              className="mobile-add-icon"
                              src={mobileAddBtn}
                              onClick={this.addTelevision}
                            ></img>
                          </a>
                          <a className="delete-btn disktop">
                            {i ? (
                              <img
                                className="disktop"
                                src={DeleteBtn}
                                onClick={this.removeTelevision}
                              ></img>
                            ) : (
                              <img></img>
                            )}
                            {i ? (
                              <img
                                className="mobile-delete-icon"
                                src={mobileDelet}
                                onClick={this.removeTelevision}
                              ></img>
                            ) : (
                              <img></img>
                            )}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}

              {this.state.showCarDetails === true ? (
                <div className="box-outer section-3 box-white">
                  <h2>Auto</h2>
                  <div className="bx-wrap">
                    {allAutoValue.map((el, i) => (
                      <div key={i} className="cst-row">
                        <div className="input-outer col-2">
                          {i ? <label></label> : <label>Brand Name</label>}
                          <input
                            type="text"
                            autoComplete="off"
                            role="presentation"
                            onFocus={() =>
                              this.setState({
                                CarErrText: "",
                              })
                            }
                            placeholder={`Car Make`}
                            name="CarMake"
                            value={el.CarMake || ""}
                            // onChange={(e) => this.addAutoData(i, e)}
                            onChange={(e) => {
                              this.addAutoData(i, e);
                              this.setState({
                                AutoBrandName: e.target.value,
                              });
                            }}
                          ></input>
                        </div>
                        <div className="input-outer col-5">
                          {i ? <label></label> : <label>Car Model</label>}
                          <input
                            type="text"
                            autoComplete="off"
                            role="presentation"
                            onFocus={() =>
                              this.setState({
                                CarErrText: "",
                              })
                            }
                            placeholder={`Car Model`}
                            name="CarModel"
                            value={el.CarModel || ""}
                            // onChange={(e) => this.addAutoData(i, e)}
                            onChange={(e) => {
                              this.addAutoData(i, e);
                              this.setState({
                                AutoCarModel: e.target.value,
                              });
                            }}
                          ></input>
                        </div>
                        <div className="input-outer col-1">
                          {i ? <label></label> : <label>Car Year</label>}
                          <input
                            type="number"
                            autoComplete="off"
                            role="presentation"
                            onFocus={() =>
                              this.setState({
                                CarErrText: "",
                              })
                            }
                            placeholder={`Car Year`}
                            name="CarYear"
                            value={el.CarYear || ""}
                            // onChange={(e) => this.addAutoData(i, e)}
                            onChange={(e) => {
                              e.target.value.length <= 4 &&
                                this.addAutoData(i, e);
                              this.setState({
                                AutoCarYear: e.target.value,
                              });
                            }}
                          ></input>
                        </div>
                        <div className="button-outer col-50">
                          <a className="plus-btn">
                            <img
                              className="disktop"
                              src={AddBtn}
                              onClick={this.addAuto}
                            ></img>
                            <img
                              className="mobile-add-icon"
                              src={mobileAddBtn}
                              onClick={this.addAuto}
                            ></img>
                          </a>
                          <a className="delete-btn">
                            {i ? (
                              <img
                                className="disktop"
                                src={DeleteBtn}
                                onClick={this.removeAuto}
                              ></img>
                            ) : (
                              <img></img>
                            )}
                            {i ? (
                              <img
                                className="mobile-delete-icon"
                                src={mobileDelet}
                                onClick={this.removeAuto}
                              ></img>
                            ) : (
                              <img></img>
                            )}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <FormHelperText style={{ color: "red" }} id="weightBoxDetailserror">
              {this.state.PackageDetailsErr}
            </FormHelperText>

            <div
              className="Package-details-outer step3"
              id="shipperdetails"
              style={{ display: "none" }}
            >
              <div className="box-outer section-1">
                <div className="cst-row">
                  <div className="input-outer input-select col-6">
                    <label>Sending from</label>
                    {/* <select
                      style={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "5px",
                      }}
                      id="fromCountrySelect"
                      onChange={(e) => this.countryChange(e, "from")}
                    >
                      {this.renderCountryOptions()}
                    </select> */}

                    <Select
                      className="from-country-div"
                      classNamePrefix="frn-select"
                      id="fromCountrySelect"
                      options={this.state.CountryListValue}
                      isSearchable="true"
                      onChange={(e) => {
                        this.handleSelect(e, "from");
                      }}
                      value={
                        this.state.SelectedOption
                          ? this.state.SelectedOption
                          : this.state.USSelectedOption
                      }
                      filterOptions={this.handleFilter}
                    ></Select>
                  </div>

                  {this.state.FromSelectedCountry.label === "United States" ? (
                    <div className="input-outer col-6">
                      <label>From Zip Code</label>
                      <div className="ipt-with-icon icn-left">
                        <input
                          id="fromzipSelect"
                          type="text"
                          maxLength={7}
                          autoComplete="off"
                          role="presentation"
                          onKeyUp={(e) => this.ChangeFromZipUS(e)}
                          placeholder=" from Zip Code"
                          onFocus={() =>
                            this.setState({
                              FromZipErr: false,
                              FromZipErrText: "",
                              FromZipNotFoundErrText: "",
                            })
                          }
                          onChange={(e) =>
                            this.setState({
                              FromZipCodeValue: e.target.value,
                            })
                          }
                        ></input>
                        <span className="ipt-icn"></span>
                      </div>

                      <FormHelperText style={{ color: "red" }}>
                        {this.state.FromZipCodeErrText}
                      </FormHelperText>
                    </div>
                  ) : this.state.FromSelectedCountry.label === "China" ? (
                    <div className="input-outer col-6">
                      <div className="cst-row">
                        <div className="col-6">
                          <label>From Zip Code</label>
                          <div className="ipt-with-icon icn-left">
                            <input
                              id="fromzipSelect"
                              type="text"
                              maxLength={7}
                              autoComplete="off"
                              role="presentation"
                              onKeyUp={(e) => this.ChangeFromZipUS(e)}
                              placeholder=" from Zip Code"
                              onFocus={() =>
                                this.setState({
                                  FromZipErr: false,
                                  FromZipErrText: "",
                                  FromZipNotFoundErrText: "",
                                })
                              }
                              onChange={(e) =>
                                this.setState({
                                  FromZipCodeValue: e.target.value,
                                })
                              }
                            ></input>
                            <span className="ipt-icn"></span>
                          </div>
                          <FormHelperText style={{ color: "red" }}>
                            {this.state.FromZipCodeErr}
                          </FormHelperText>
                          <FormHelperText style={{ color: "red" }}>
                            {this.state.FromZipCodeErr}
                          </FormHelperText>
                        </div>
                        <div className="col-6">
                          <div className="input-outer input-select">
                            {/* <Autocomplete
                              options={FromFedExCityListDisplay}
                              id="fromCitySelect"
                              getOptionLabel={(option) => option.label}
                              // value={this.state.FromFedExSelectedCity}
                              value={this.state.FromFedExCityValue}
                              autoSelect
                              onFocus={(e) =>
                                this.handleChange_Value1("FromFedExCity")
                              }
                              onBlur={(e) =>
                                this.handleChange_Value1("FromFedExCity")
                              }
                              onChange={(event, value) =>
                                this.ChangeFromCity(value, "FedEx")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select City"
                                  fullWidth
                                  error={this.state.FromCityErr}
                                  helperText={this.state.FromCityErrText}
                                  variant="outlined"
                                />
                              )}
                            /> */}

                            <Select
                              className="from-country-div"
                              classNamePrefix="frn-select"
                              id="fromCitySelect"
                              options={FromFedExCityListDisplay}
                              isSearchable="true"
                              // value={this.state.FromFedExCityValue}
                              onFocus={(e) =>
                                this.handleChange_Value1("FromFedExCity")
                              }
                              onBlur={(e) =>
                                this.handleChange_Value1("FromFedExCity")
                              }
                              onChange={(event, value) =>
                                this.ChangeFromCity(value, "FedEx")
                              }

                              // filterOptions={this.handleFilter}
                            ></Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : this.state.FromIsFedxCity === 1 ? (
                    <div className="input-outer input-select col-6">
                      <div className="top-sp">
                        {/* <select
                          style={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "5px",
                            marginTop: "33px",
                          }}
                          id="fromCitySelect"
                          onChange={(e) => this.ChangeFromCity(e, "FedEx1")}
                          onFocus={() =>
                            this.setState({
                              FromCityErr: false,
                              FromCityErrText: "",
                            })
                          }
                        >
                          <option value="">Select City</option>
                          {this.renderFedxCityOptions("from")}
                        </select> */}

                        <Select
                          className="from-country-div"
                          classNamePrefix="frn-select"
                          id="fromCitySelect"
                          options={this.state.FromFedExCityOptionValue}
                          isSearchable="true"
                          onChange={(e) => {
                            this.ChangeFromCity(e, "FedEx1");
                          }}
                          value={this.state.FromFedExCityValue}
                          // filterOptions={this.handleFilter}
                        ></Select>
                      </div>
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.FromFedExCityValueErr}
                      </FormHelperText>
                    </div>
                  ) : (
                    <div className="input-outer col-6">
                      <label>From Zip Code</label>
                      <div className="ipt-with-icon icn-left">
                        <input
                          id="fromzipSelect"
                          type="text"
                          maxLength={7}
                          autoComplete="off"
                          role="presentation"
                          onKeyUp={(e) => this.ChangeFromZipUS(e)}
                          placeholder=" from Zip Code"
                          onFocus={() =>
                            this.setState({
                              FromZipErr: false,
                              FromZipErrText: "",
                              FromZipNotFoundErrText: "",
                              FromZipCodeErrText: "",
                            })
                          }
                          onChange={(e) =>
                            this.setState({
                              FromZipCodeValue: e.target.value,
                            })
                          }
                        ></input>
                        <span className="ipt-icn"></span>
                      </div>
                      {/* <FormHelperText style={{ color: "red" }}>
                        {this.state.FromZipErrText}
                      </FormHelperText> */}
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.FromZipCodeErr}
                      </FormHelperText>
                    </div>
                  )}
                </div>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.ShipmentErr}
                </FormHelperText>
              </div>
              <div className="box-outer section-2 ">
                <div className="cst-row">
                  <div className="input-outer input-select col-6">
                    <label>Sending to</label>
                    <Select
                      className="from-country-div"
                      classNamePrefix="frn-select"
                      id="toCountrySelect"
                      options={this.state.CountryListValue}
                      isSearchable="true"
                      onChange={(e) => {
                        this.handleSelect(e, "to");
                      }}
                      // value={
                      //   this.state.ToSelectedCountry?.label
                      //     ? this.state.ToSelectedCountry
                      //     : ""
                      // }
                      value={
                        this.state.ToSelectedCountry?.label
                          ? this.state.ToSelectedCountry
                          : this.state.SelectedOptionTo
                      }
                      filterOptions={this.handleFilter}
                    ></Select>
                  </div>
                  {this.state.ToSelectedCountry.label === "United States" ? (
                    <div className="input-outer col-6">
                      <label>To Zip Code</label>
                      <div className="ipt-with-icon icn-left">
                        <input
                          id="TozipSelect"
                          type="text"
                          maxLength={7}
                          autoComplete="off"
                          role="presentation"
                          hidden={
                            Object.keys(this.state.ToSelectedCountry).length ===
                            0
                              ? "hidden"
                              : ""
                          }
                          onKeyUp={(e) => this.ChangeToZipUS(e)}
                          placeholder="To Zip Code"
                          onFocus={() =>
                            this.setState({
                              ToZipCodeErr: false,
                              ToZipCodeHelperText: "",
                              ToZipCodeEnterText: "",
                            })
                          }
                        ></input>
                        <span className="ipt-icn"></span>
                      </div>
                      <FormHelperText>
                        {this.state.ToZipCodeHelperText}
                      </FormHelperText>
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.ToZipErrText}
                      </FormHelperText>
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.ToZipCodeEnterText}
                      </FormHelperText>
                    </div>
                  ) : this.state.ToSelectedCountry.label === "China" ? (
                    <div className="input-outer col-6">
                      <div className="cst-row">
                        <div className="input-outer col-6">
                          <label>To Zip Code</label>
                          <div className="ipt-with-icon icn-left">
                            <input
                              id="TozipSelect"
                              type="text"
                              maxLength={7}
                              autoComplete="off"
                              role="presentation"
                              hidden={
                                Object.keys(this.state.ToSelectedCountry)
                                  .length === 0
                                  ? "hidden"
                                  : ""
                              }
                              onKeyUp={(e) => this.ChangeToZipUS(e)}
                              placeholder="To Zip Code"
                              onFocus={() =>
                                this.setState({
                                  ToZipCodeErr: false,
                                  ToZipCodeHelperText: "",
                                  ToZipCodeEnterText: "",
                                })
                              }
                            ></input>
                            <span class="ipt-icn"></span>
                          </div>
                          <FormHelperText>
                            {this.state.ToZipCodeHelperText}
                          </FormHelperText>
                          <FormHelperText style={{ color: "red" }}>
                            {this.state.ToZipErrText}
                          </FormHelperText>
                          <FormHelperText style={{ color: "red" }}>
                            {this.state.ToZipCodeEnterText}
                          </FormHelperText>
                        </div>
                        <div className="input-outer col-6">
                          <div className="input-outer input-select">
                            <Autocomplete
                              options={ToFedExCityListDisplay}
                              id="toCitySelect"
                              getOptionLabel={(option) => option.label}
                              // value={this.state.ToFedExSelectedCity}
                              value={this.state.ToFedExCityValue}
                              autoSelect
                              hidden={
                                Object.keys(this.state.ToSelectedCountry)
                                  .length === 0
                                  ? "hidden"
                                  : ""
                              }
                              onFocus={(e) =>
                                this.handleChange_Value1("FromFedExCity")
                              }
                              onBlur={(e) =>
                                this.handleChange_Value1("ToFedExCity")
                              }
                              onChange={(event, value) =>
                                this.ChangeToCity(value, "FedEx")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select City"
                                  fullWidth
                                  error={this.state.ToCityErr}
                                  helperText={this.state.ToCityErrText}
                                  variant="outlined"
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : this.state.ToIsFedxCity === 1 ? (
                    <div className="input-outer input-select col-6">
                      <div className="top-sp">
                        <Select
                          className="from-country-div"
                          classNamePrefix="frn-select"
                          id="toCitySelect"
                          options={this.state.ToFedExCityOptionValue}
                          isSearchable="true"
                          onChange={(e) => {
                            this.ChangeToCity(e, "FedEx1");
                          }}
                          value={this.state.ToFedExCityValue}
                          // filterOptions={this.handleFilter}
                        ></Select>
                      </div>
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.ToZipCodeValueErr}
                      </FormHelperText>
                    </div>
                  ) : this.state.ToSelectedCountry.label != "" ? (
                    <div className="input-outer col-6">
                      <div className="top-sp">
                        <div className="ipt-with-icon icn-left">
                          <input
                            id="TozipSelect"
                            type="text"
                            maxLength={7}
                            autoComplete="off"
                            role="presentation"
                            hidden={
                              Object.keys(this.state.ToSelectedCountry)
                                .length === 0
                                ? "hidden"
                                : ""
                            }
                            onKeyUp={(e) => this.ChangeToZipUS(e)}
                            placeholder="To Zip Code"
                            onFocus={() =>
                              this.setState({
                                ToZipCodeErr: false,
                                ToZipCodeHelperText: "",
                                ToZipCodeEnterText: "",
                              })
                            }
                          ></input>
                          {this.state.ToSelectedCountry.label == "" ? (
                            ""
                          ) : (
                            <span className="ipt-icn"></span>
                          )}
                        </div>
                      </div>
                      <FormHelperText>
                        {this.state.ToZipCodeHelperText}
                      </FormHelperText>
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.ToZipErrText}
                      </FormHelperText>
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.ToZipCodeEnterText}
                      </FormHelperText>
                    </div>
                  ) : null}
                  <div className="resident-check">
                    <input
                      type="checkbox"
                      onChange={(e) => this.isResidenceChange(e)}
                    />{" "}
                    I'm shipping to a residence
                  </div>
                </div>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.ToStateCodeValueErr}
                </FormHelperText>
              </div>
            </div>
            <div
              className="Package-details-outer step4"
              id="shipsmart"
              style={{ display: "none" }}
            >
              <div className="box-outer section-1">
                <div className="input-outer col-4">
                  <label>Name</label>
                  <input
                    autoComplete="off"
                    role="presentation"
                    id="ContactName"
                    type="text"
                    maxLength={30}
                    onBlur={(e) => this.validateShipperInfo(e, "cname")}
                    onChange={(e) => {
                      this.shipperInfoChange(e, "ContactName");
                    }}
                    onFocus={() =>
                      this.setState({
                        cnameErrText: "",
                      })
                    }
                    placeholder="Enter name"
                  ></input>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.cnameErrText}
                  </FormHelperText>

                  <span className="user-icon"></span>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.ContactvalueErr}
                  </FormHelperText>
                </div>
                <div className="input-outer col-4">
                  <label>Email Address</label>
                  <input
                    autoComplete="off"
                    role="presentation"
                    type="text"
                    maxLength={30}
                    id="email"
                    onBlur={(e) => this.validateShipperInfo(e, "email")}
                    onChange={(e) => this.shipperInfoChange(e, "Email")}
                    onFocus={() =>
                      this.setState({
                        EmailErrText: "",
                        shipperdetailsErrText: "",
                      })
                    }
                    placeholder="Enter email"
                  ></input>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.EmailErrText}
                  </FormHelperText>
                  <span className="email-icon"></span>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.EmailvalueErr}
                  </FormHelperText>
                </div>
                <div className="input-outer col-4">
                  <label>Phone Number</label>
                  <input
                    autoComplete="off"
                    role="presentation"
                    id="Number"
                    type="number"
                    placeholder="Enter phone number"
                    value={this.state.PhoneNumber || ""}
                    // onChange={(e) => this.getBoxesData(i, e)}
                    onChange={(e) => {
                      e.target.value.length <= 10 &&
                        // this.getBoxesData(i, e);
                        this.setState({ PhoneNumber: e.target.value });
                    }}
                    // id="Number"
                    // type="tel"
                    // maxlength="10"
                    // onKeyPress={(e) => this.validateShipperInfo(e, "phone")}
                    // onBlur={(e) => this.validateShipperInfo(e, "phoneblur")}
                    // onChange={(e) => this.shipperInfoChange(e, "Number")}
                    // onFocus={() =>
                    //   this.setState({
                    //     contactErrText: "",
                    //     onlyNumberErrText: "",
                    //     ContactNumberErrText: "",
                    //   })
                    // }
                  ></input>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.contactErrText}
                  </FormHelperText>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.onlyNumberErrText}
                  </FormHelperText>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.ContactNumberErrText}
                  </FormHelperText>
                  <span className="phone-icon"></span>
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.PhoneNumbervalueErr}
                  </FormHelperText>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="btn-outer">
            <a
              className="backbtn"
              // href="/NewGetRate"
              onClick={() =>
                this.navigateChangeprevious(this.state.NextButtonIdx - 1)
              }
            >
              Back
            </a>
            <a
              className="nextbtn"
              onClick={() => this.navigateChange(this.state.NextButtonIdx + 1)}
            >
              Next
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default GetQuoteThankyouDemo;

import React, { useState } from "react";
import Navbar from "../component/Navbar.js";
import Itemtable from "../component/Itemtable.js";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip"; 
import Contact from "../component/Contact.js";
import AddCustomer from "../Admin/FormInput.js";
import ItemForm from "../Admin/ItemForm.js";
import CategoryList from "./CategoryList.js";
import CustomerList from "./CustomerList.js";
import ItemList from "./ItemList.js";
import Sell from "./Sell.js";
import Analysis from "./Analysis.js";
import Payment from './Payment.js';
import Transaction from "./Transaction.js";
import Invoice from "./Invoice.js";
import { faL } from "@fortawesome/free-solid-svg-icons";
// import { set } from "mongoose";
// import { Link } from 'react-router-dom'
export default function Dashboard() {
  const links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact Us", link: "/contact" },
    { name: "Dashboard", link: "/dashboard" },
  ];

  //for sell page
  const [formData, setFormData] = useState({
    customerId: "",
    customerFirstname: "",
    customerLastname: "",
    customerPhone: "",
  });

  const [history, sethistory] = useState(false);
  const [contact, setContact] = useState(false);
  const [customerList, setcustomerList] = useState(false);
  const [itemList, setitemList] = useState(false);
  const [recent, setrecent] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [categoryList, setcategoryList] = useState(false);
  const [sell, setSell] = useState(false);
  const [analysis, setAnalysis] = useState(true);
  const [payment, setPayment] = useState(false);
  const [transaction,setTransaction] = useState(false);
  const [invoice,setInvoice] = useState(false);
  const [reports,setReports] = useState(false)

  return (
    <>
      <div className='md:h-20 h-12'>
                <Navbar links={links} setAddCustomer={setAddCustomer} setitemList={setitemList} setContact={setContact} setAddItem={setAddItem} setcategoryList={setcategoryList} setcustomerList={setcustomerList} setPayment={setPayment} setSell={setSell} setAnalysis={setAnalysis} setTransaction={setTransaction} setInvoice={setInvoice}/>
     </div>
      <div className="flex flex-row mb-2 ">
        <div className="md:w-1/6 w-2/4 bg-gray-700 my_side_bar mt-1">
          <table className="place-items-center w-full text-white capitalize md:text-xl font-medium tracking-wide">
            <tr
              className={` mt-2 hover:bg-white hover:rounded-l-full hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${
                analysis ? "bg-white text-[#1F3F49] rounded-l-full" : ""
              }`}
            >
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-glyphs/30/control-panel--v2.png"
                alt="control-panel--v2"
                className="mr-3"
              />
              <Tooltip title='Go to Dashboard'>
              <Link
                to="/"
                onClick={() => {
                  setAddItem(false);
                  setContact(false);
                  setAddCustomer(false);
                  setcategoryList(false);
                  setitemList(false);
                  setSell(false);
                  setPayment(false);
                  setcustomerList(false);
                  setTransaction(false);
                  setInvoice(false);
                  setAnalysis(true);
                }}
              >
              DashBoard
              </Link>
              </Tooltip>
            </tr>
            <tr className={` mt-2 hover:bg-white hover:rounded-l-full hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${
                transaction ? "bg-white text-[#1F3F49] rounded-l-full" : ""
              }`}>
            <Tooltip title='Go to Transaction List'>
             <Link
                to="/"
                onClick={() => {
                  setAddItem(false);
                  setContact(false);
                  setAddCustomer(false);
                  setcategoryList(false);
                  setitemList(false);
                  setSell(false);
                  setPayment(false);
                  setcustomerList(false);
                  setAnalysis(false);
                  setInvoice(false);
                  setTransaction(true);
                }}
              >
              Transaction
              </Link>
              </Tooltip>
            </tr>
            <tr
              className={`mt-2 hover:bg-white hover:rounded-l-full hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${
                customerList ? "bg-white text-[#1F3F49] rounded-l-full" : ""
              }`}
            >
              <Tooltip title='Go to Customer List'>
              <Link
                to="/"
                onClick={() => {
                  setAddItem(false);
                  setContact(false);
                  setAddCustomer(false);
                  setcategoryList(false);
                  setitemList(false);
                  setSell(false);
                  setAnalysis(false);
                  setPayment(false);
                  setTransaction(false);
                  setInvoice(false);
                  setcustomerList(true);
                }}
              >
                Customer List
              </Link>
              </Tooltip>
            </tr>
            <tr
              className={`mt-2 hover:bg-white hover:rounded-l-full hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${
                itemList ? "bg-white text-[#1F3F49] rounded-l-full" : ""
              }`}
            >
              <Tooltip title='Go to Item List'>
              <Link
                to="/"
                onClick={() => {
                  setAddItem(false);
                  setContact(false);
                  setAddCustomer(false);
                  setcategoryList(false);
                  setSell(false);
                  setAnalysis(false);
                  setPayment(false);
                  setTransaction(false);
                  setcustomerList(false);
                  setInvoice(false);
                  setitemList(true);
                }}
              >
                Item List
              </Link>
              </Tooltip>
            </tr>
            <tr
              className={`mt-2 hover:bg-white hover:rounded-l-full hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${
                categoryList ? "bg-white text-[#1F3F49] rounded-l-full" : ""
              }`}
            >
              <Tooltip title='Go to Category List'>
              <Link
                to="/"
                onClick={() => {
                  setAddItem(false);
                  setitemList(false);
                  setAddCustomer(false);
                  setContact(false);
                  setSell(false);
                  setcustomerList(false);
                  setAnalysis(false);
                  setPayment(false);
                  setTransaction(false);
                  setInvoice(false);
                  setcategoryList(true);
                }}
              >
                category List
              </Link>
              </Tooltip>
            </tr>
            <tr
              className={`mt-2 hover:bg-white hover:rounded-l-full hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${
                invoice ? "bg-white text-[#1F3F49] rounded-l-full" : ""
              }`}
            >
              <Tooltip title='Get Invoice'>
              <Link
                to="/"
                onClick={() => {
                  setAddItem(false);
                  setitemList(false);
                  setAddCustomer(false);
                  setContact(false);
                  setSell(false);
                  setcustomerList(false);
                  setAnalysis(false);
                  setPayment(false);
                  setTransaction(false);
                  setcategoryList(false);
                  setInvoice(true);
                }}
              >
               Invoice
              </Link>
              </Tooltip>
            </tr>
            {/* <tr
              className={`mt-2 hover:bg-white hover:rounded-l-full hover:text-black border-slate-500 h-20  flex items-center justify-center  cursor-pointer ${
                reports ? "bg-white text-[#1F3F49] rounded-l-full" : ""
              }`}
            >
              <Link
                to="/"
                onClick={() => {
                  setAddItem(false);
                  setitemList(false);
                  setAddCustomer(false);
                  setContact(false);
                  setSell(false);
                  setcustomerList(false);
                  setAnalysis(false);
                  setPayment(false);
                  setTransaction(false);
                  setcategoryList(false);
                  setInvoice(false);
                }}
              >
               Reports
              </Link>
            </tr> */}
            <tr className="hover:uppercase mt-4 h-20 flex  hover:bg-gray-300 items-center  justify-center  cursor-pointer"></tr>
          </table>
        </div>
        <div className='md:w-3/4 w-2/4 ml-72'>
                    {itemList ? <Itemtable /> : contact ? <Contact /> : addCustomer ? <AddCustomer /> : addItem ? <ItemForm /> : categoryList ? <CategoryList /> : customerList ? <CustomerList setAddCustomer={setAddCustomer} setitemList={setitemList} setContact={setContact} setAddItem={setAddItem} setcategoryList={setcategoryList} setcustomerList={setcustomerList} setPayment={setPayment} setSell={setSell} setFormData={setFormData} setinvoice={setInvoice} /> : sell ? <Sell formData={formData} setAddCustomer={setAddCustomer} setitemList={setitemList} setContact={setContact} setAddItem={setAddItem} setcategoryList={setcategoryList} setcustomerList={setcustomerList} setPayment={setPayment} setSell={setSell} setFormData={setFormData}  setInvoice={setInvoice} /> : payment ? <Payment />: transaction ? <Transaction />: invoice ? <Invoice /> : analysis ? <Analysis />: <Analysis/>}
                </div>
      </div>
    </>
  );
}

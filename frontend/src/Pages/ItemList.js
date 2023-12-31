import React, {useEffect,useState} from 'react';
import nullImage from "../images/nullImg.png"
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import { AiFillDelete,AiFillEdit } from 'react-icons/ai';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useContext } from 'react';
import { AppState } from "../App.js";
import Tooltip from "@mui/material/Tooltip";


function ItemList(){
    const[items,setitems] = useState([]);
    const [query, setQuery] = useState("");
    const [order,setOrder] = useState('ASC');
    const [open,setOpen]=useState(false);
    const [selected,setSelected]=useState(null);
    const [editItem,setEditItem]=useState({});
    console.log(query);
    
    const useAppState = useContext(AppState);
    const userID = useAppState.UserId;

    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 6; 

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(items.length / itemPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);  
        }
    };

    const handleEditItem = async ()=>{
        console.log(editItem);
        console.log(selected._id);
        try {
            const response = await fetch(`http://localhost:4000/add/updateitem/${selected._id}`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(editItem),
            });
        
            if(response.ok){
                const updateItem = await response.json();
                setSelected(updateItem.item);
                swal({
                    title:"Success!",
                    text:'Update Item Successfully',
                    icon:"success",
                    timer:3000
                })
                setOpen(false);
                fetchItems(); 
            }
            else{
                const errorData = await response.json();
                console.log(errorData.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickOpen =  (item) =>{
        console.log(item);
        setSelected(item);
        console.log(selected);
        setEditItem({
            itemname:item.itemname,
            itemcategory:item.itemcategory,
            costprice:item.costprice,
            sellingprice:item.sellingprice,
            quantity:item.quantity,
            units:item.units,
        })
        setOpen(true);
    }
    const handleClose2 = () =>{
        setOpen(false);
    }

  async function fetchItems(){
      try{
        const requestData = {
            userID: userID,
        };
        fetch('http://localhost:4000/add/fetch_items',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response=>{
            if(!response.ok){
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            setitems(data)
        })
        .catch(error=>{
            console.error('Error fetching Items: ',error);
        })
    }catch(err){
        window.alert(err);
    }
    };
    const sorting = (col) =>{
        if(order==='ASC'){
            const sorted = [...items].sort((a,b)=>
            parseInt(a[col]) > parseInt(b[col]) ? 1 : -1);
            setitems(sorted);
            setOrder('DSC');
        }
        if(order==='DSC'){
            const sorted = [...items].sort((a,b)=>
            parseInt(a[col]) < parseInt(b[col]) ? 1 : -1);
            setitems(sorted);
            setOrder('ASC');
        }
    }
    
   const handleDeleteItem = async (Id) => {
        const confirmResult = await swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Item!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        });

        if (confirmResult) {


            console.log("ljl")
            console.log(Id);

            let data = await fetch(`http://localhost:4000/delete/deleteItem/${Id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(data)
            const res = await data.json();
            swal({
                title: "Item deleted succesfully",
                icon: "success",
                button: false,
                timer: 3000
            })
            fetchItems();
        }
    }


    useEffect(()=>{
        fetchItems();
    },[]);

    return(
      <div className="container mx-auto">
            <h1 className='mt-7 font-bold bg-gray-700 w-full h-full text-white text-center mx-auto p-3 rounded-full uppercase shadow-lg'>Item's Details</h1>
            <Tooltip title='Search Items'>
            <div className="mt-6  flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search Item"
                    className="border-4 rounded-md border-[#1F3F49] px-2 py-1 mr-2 w-[60%]"
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
            </Tooltip>
            {items.length == 0 ?
                (<div className="flex flex-col items-center justify-center mt-36">
                    <img src={nullImage} alt="Description of the image" />
                    <h3>No Data</h3>
                </div>
                ) : (
            <div className='mt-8 flex flex-col justify-center items-center'>

                <table className=" border-collapse">
                    <thead className="text-center">
                        <tr>
                            <th className=" rounded-tl-xl border-gray-700 bg-gray-700 px-4 py-4 text-white  text-center text-xs font-medium uppercase">
                                <div className="" >Item ID</div>
                            </th>
                            <th className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white  text-center text-xs font-medium  uppercase">
                                <div className="">Item Name</div>
                            </th>
                            <th className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Item Category</div>
                            </th>
                            <th onClick={() => sorting("costprice")} className="border-gray-700 w-auto py-2  bg-gray-700  px-4 py-4 text-white text-center text-xs font-medium  uppercase cursor-pointer">
                                <div className="flex flex-row">Cost Price
                                   <Tooltip title='Sort Cost Price'>
                                    <img width="20" height="20" className='ml-2' src="https://img.icons8.com/pastel-glyph/64/000000/sorting-arrows--v1.png" alt="sorting-arrows--v1" />
                                    </Tooltip>
                                </div>
                            </th>
                            <th onClick={() => sorting("sellingprice")} className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white text-center text-xs font-medium  uppercase cursor-pointer">
                                <div className="flex flex-row">Selling Price
                                <Tooltip title='Sort Selling Price'><img width="20" height="20" className='ml-2' src="https://img.icons8.com/pastel-glyph/64/000000/sorting-arrows--v1.png" alt="sorting-arrows--v1" /></Tooltip></div>
                            </th>
                            <th onClick={() => sorting("quantity")} className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white text-center text-xs font-medium  uppercase cursor-pointer">
                                <div className="flex flex-row">Quantity
                                <Tooltip title='Sort Quantity'>
                                <img width="20" height="20" className='ml-2' src="https://img.icons8.com/pastel-glyph/64/000000/sorting-arrows--v1.png" alt="sorting-arrows--v1" />
                                </Tooltip></div> 
                            </th>
                            <th className="border-gray-700 w-auto py-2  bg-gray-700 px-4 py-4 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Units</div>
                            </th>
                            <th className="  border-gray-700 px-4 py-2 px-4 py-4  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Edit</div>
                            </th>
                            <th className=" rounded-tr-xl border-gray-700 px-4 py-2 px-4 py-4  bg-gray-700 text-white text-center text-xs font-medium  uppercase">
                                <div className="">Delete</div>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentItem.filter((item) => item.itemname.toLowerCase().includes(query.toLowerCase()) || item.itemcategory.toLowerCase().includes(query.toLowerCase())).map((item, index) => (
                            <tr className='text-center capitalize hover:border-2 hover:border-black hover:rounded-md' style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#f8f8f8' }} key={index}>
                                <td className='border border-gray-300 px-4 py-2 m-2 rounded bg-[1F3F49]'><p className='bg-gray-700 text-white w-8 h-8 rounded-full mt-1'>{index + 1 + (currentPage-1)*itemPerPage}</p></td>
                                <td className='border border-gray-300 px-4 py-2'>{item.itemname}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.itemcategory}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.costprice}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.sellingprice}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.quantity}</td>
                                <td className='border border-gray-300 px-4 py-2'>{item.units}</td>
                                <td className='border border-gray-200 px-4 py-2 customer_link text-blue-800'>
                                    <Tooltip title='Edit Item'>
                                    <Button variant="outlined" onClick={()=>handleClickOpen(item)} style={{ color: "blue", border: "2px solid blue",fontWeight: "bold" }}><AiFillEdit /> Edit</Button>
                                    </Tooltip>
                                </td>
                                <td className='border border-gray-200 px-4 py-2 customer_link'>
                                    <Tooltip title='Delete Item'>
                                    <Button variant="outlined" onClick={() => handleDeleteItem(item._id)} style={{ color: "red", border: "2px solid red",fontWeight:"bold" }}><AiFillDelete /> Delete</Button>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Dialog open={open} onClose={handleClose2}>
                <DialogTitle style={{backgroundColor: '#6AB187'}} className='bg-green-700 text-white font-bold w-full h-full'>Edit Customer's Details</DialogTitle>
                <DialogContent className='mt-4' style={{ height: '400px', overflowY: 'auto' }}>
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editItem.itemname} onChange={(e) => setEditItem({ ...editItem, itemname: e.target.value })} label="Item Name" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editItem.costprice} onChange={(e) => setEditItem({ ...editItem, costprice: e.target.value })} label="Cost Price" type="text" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editItem.sellingprice} onChange={(e) => setEditItem({ ...editItem, sellingprice: e.target.value })} label="Selling Price" type="email" />
                    <TextField autoFocus style={{ marginBottom: "1rem" }} className='w-full' value={editItem.quantity} onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })} label="Quantity" type="text" />
                </DialogContent>
                <DialogActions>
                    <Button style={{ border: "1px solid #6AB187", color: "#6AB187" }} onClick={handleClose2}>Cancel</Button>
                    <Button style={{ backgroundColor: "#6AB187", color: "white" }} onClick={handleEditItem}>Edit</Button>
                </DialogActions>
            </Dialog>
            <div className="mt-4 flex items-center justify-center" >
                <button
                    className={`mx-2 p-2 border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed rounded-md shadow-lg' : 'hover:bg-green-800 hover:text-white rounded-md shadow-lg'}`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`mx-2 p-2 border ${currentPage === pageNumber ? 'bg-green-800 text-white rounded-full w-10 shadow-lg' : 'hover:bg-green-800 hover:text-white rounded-full w-10 shadow-lg'}`}
                        onClick={() => paginate(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}

                <button
                    className={`mx-2 p-2 border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed rounded-md shadow-lg' : 'hover:bg-green-800 hover:text-white rounded-md shadow-lg'}`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            </div>
             )}
        </div>
    )
}

export default ItemList ;

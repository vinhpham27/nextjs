'use client'
import axios from "axios";
import { useRef, useEffect, useState } from "react";


function HomePage() {

    console.log("Homepage render!");

    const textboxRef = useRef(null);
    const usrRef = useRef([]);

    const protocol = "http";
    //const serverip = "54.206.84.42";
    const serverip = "localhost";
    const port = "8080";

    const URL = `${protocol}://${serverip}:${port}`;
    //data for re-render viewuser
    const [data, setData] = useState([]);

    //flag for clearing user input text
    const [inputText, setInputText] = useState('');

    //flag for checking to view user
    const [dataFetched, setDataFetched] = useState(false);

    //flag for editting user
    const [editU, setEditU] = useState([]);

    //send GET request to server (to list members)
    //Send POST request to server
    useEffect(() => {
      if (!dataFetched) {
        axios.get(`${URL}/viewuser`).then( (response) => {
          console.log(response);
          setData(response.data);
          setDataFetched(true);
        }).catch( (err) => {
          console.error(err);
        });
      }
    }, [data, dataFetched]);
    
    const handleInputChange = (e) => {
      setInputText(e.target.value);
    };
    ////////////////////////////////////
    ////        ADD USER        ///////
    //////////////////////////////////
    const adduser = () => {

      const user = {
        name: textboxRef.current.value,
        address: 'Can Tho'
      };

      //Send POST request to server
      axios.post(`${URL}/adduser`, user).then( (response) => {
        setDataFetched(false);
      }).catch( (err) => {
        console.error(err);
      });
      //clear input text
      setInputText('');
    }

    ////////////////////////////////////
    ////        EDIT USER        ///////
    //////////////////////////////////
    const editUser = (index) => {
      const allArrayFalse = new Array(data.length).fill(false);
      allArrayFalse[index] = !editU[index];
      setEditU(allArrayFalse);
      if (editU[index]) {

        const sdata = {
          userid: data[index].id,
          username: usrRef.current[index].value
        };
        //Send POST request to server
        axios.post(`${URL}/edituser`, sdata).then( (response) => {
          setDataFetched(false);
        }).catch( (err) => {
          console.error(err);
        });
      }

      
    };

    const deleteUser = (userID) => {
        //Send POST request to server
        axios.delete(`${URL}/deleteuser/${userID}` ).then( (response) => {
          setDataFetched(false);
        }).catch( (err) => {
          console.error(err);
        });
      
    };
  
  
    return <>
        <div className="container">
          <div className="grid grid-cols-6 gap-4">
            <div className=' col-span-6 py-10'>
              <h1 className='text-center text-3xl text-cyan-800 font-bold'>Danh sách thành viên </h1>
            </div>
            <div className='col-start-2 xl:col-start-3 col-span-3 h-10 m-4'>
              <input type='text' ref={textboxRef} className='border w-3/4 h-full' placeholder='Nhập tên thành viên...' value={inputText} onChange={handleInputChange}></input>
              <button onClick={adduser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded">
                Thêm
              </button>
            </div>


          </div>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-start-3 col-span-3">

              <table className="w-full text-gray-500">
                <thead className="bg-gray-50 uppercase p-4">
                  <tr>
                    <th className="py-3">Họ Tên</th>
                    <th className="py-3">Địa Chỉ</th>
                    <th className="py-3">Xoá / Chỉnh sửa</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((dataItem, index) => (
                    <tr key={index} className="group border-b hover:bg-orange-50 hover:font-bold">
                      <td className="px-4 py-3">
                        {
                          !editU[index] ? dataItem.name : <input autoFocus type="text" ref={(el) => {usrRef.current[index] = el}} className='border w-full h-full' defaultValue={dataItem.name}></input>
                        }
                      </td>
                      <td className="px-4 py-3">
                        {dataItem.address}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => deleteUser(dataItem.id)} className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-auto opacity-0 group-hover:opacity-100">
                          Xoá
                        </button>
                        <button onClick={() => editUser(index)} className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-auto opacity-0 group-hover:opacity-100">
                        {!editU[index] ? "Chỉnh sửa" : "Cập Nhật"}
                        </button> 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            </div>
          </div>

          

        </div>
      </>
}


export default HomePage;
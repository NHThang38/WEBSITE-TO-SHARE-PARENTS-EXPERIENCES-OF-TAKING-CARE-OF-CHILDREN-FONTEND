 /* eslint-disable */
import React, { useState } from "react";
import "../style/searchBar.css";
import { Link } from "react-router-dom";
const SearchBar = ({ placeholder, data, dataUser }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    
    const [flag, setFlag] = useState(true);
    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = data.filter((value) => {
        
            return value.title.toLowerCase().includes(searchWord.toLowerCase()) || value.user.username.toLowerCase().includes(searchWord.toLowerCase());
        });
        const newFilterUser = dataUser.filter((value) => {
        
            return value.fullName.toLowerCase().includes(searchWord.toLowerCase());
        });
        

        if (searchWord === "") {
            
            setFilteredData([]);
          
        } else {
            
            if(newFilter.length > 0){
                setFlag(true);
                setFilteredData(newFilter);
            }else{
                setFlag(false)
            setFilteredData(newFilterUser)
            }
            

            
  
        }
    };
   
    const clearInput = () => {
        setFilteredData([]);
  
    };
 
    return (
        <div className="search ">
            <div className="searchInputs d-flex">
                <input
                    type="text"
                    placeholder={placeholder}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {filteredData.length === 0 ? (
                        <i className="fa fa-search"></i>
                    ) : (
                        <i
                            className="fa fa-times"
                            id="ClearBtn"
                            onClick={clearInput}
                        ></i>
                    )}
                </div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.map((value, key) => {
                        return (
                            <div key={key}>
                                {flag ? (
                                
                                         <div className="d-flex">
                                           <div className="w-70">
                                           <Link
                                           className="dataItem"
                                           key={key}
                                           target="_blank"
                                           to={`/post/${value.id}`}
                                         
                                           style={{ textDecoration: "none"}}
                                       >
                                           <p> {value.title}</p>
                                           </Link> 
                                           </div>
                                           <div  className="w-30" >
                                           <Link
                                    className="dataItem"
                                    key={key}
                                    target="_blank"
                                    to={`/profile/${value.user.id}`}
                                  
                                    style={{ textDecoration: "none"}}
                                >
                                           <p className="username_search">{value.user.username}</p>
                                           </Link>
                                           </div>
                                          
                                         
                                         </div>
                                           
                                         
                                           
                                       
                                  
                                    
                                ): (
                                    <Link
                                    className="dataItem"
                                    key={key}
                                    target="_blank"
                                    to={`/profile/${value.id}`}
                                  
                                    style={{ textDecoration: "none"}}
                                >
                                  <div className="d-flex">
                                    <div className="w-70">
                                    </div>
                                    <div  className="w-30" >
                                    <p className="username_search">{value.fullName}</p>
                                    </div>
                                   
                                  
                                  </div>
                                    
                                  
                                    
                                
                                </Link>
                                )}
                                
                                
                                      
                     
                                
                            </div>
                            
                      
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousal from '../components/Carousal';

export default function Home() {

  // use state contain only array not object and initially it has been set to null
  const [search,setSearch]= useState('');
  const [foodCat,setFoodCat]= useState([]);
  const [foodItem, setFoodItem]= useState([]);

  const loadData= async () => {
    let response= await fetch('http://localhost:5000/api/fooditems',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      }
    });

    response=await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    console.log(response[0],response[1]);
  }

  useEffect(() => {
    loadData()
  },[]);

  return (
    <div>
        <div> <Navbar /> </div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit: "contain !important"}}>
    

    <div className="carousel-inner" style={{maxHeight: "500px"}}>
        <div className="carousel-caption" style={{zIndex: "10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>

    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}} />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700?dosa" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}} />
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900x700?pizza" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}} />
    </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>


        {/* <div> <Carousal /></div> */}
        <div className='conatiner m-3'>
          {
            foodCat !=[] ? 
            foodCat.map((data) => {
              return (<div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
                </div>

                <hr />

                {
                  foodItem != [] ?
                  foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map((filterItems) => {
                    return (<div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      {/* <Card foodName={filterItems.name} 
                      options={filterItems.options[0]} 
                      imgSrc={filterItems.img} /> */}

                      {/* all the things are wrapped inside this filterItems */}
                      <Card foodItem={filterItems} 
                            options={filterItems.options[0]} 
                            />
                    </div>)
                  }):<div>No item found</div>
                }
              </div>)
            }):""
          }
        </div>
        <div> <Footer /> </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'
import '../css/show.css'

const MySwal = withReactContent(Swal)

const Show = () => {
  const [products, setProducts] = useState([])
  const productsCollection = collection(db, 'products')
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

    console.log(products)
  }

  // Function to delete products
  const deleteProduct = async (id) => {
    const productDoc = doc(db, 'products', id)
    await deleteDoc(productDoc)
    getProducts()
  }

  // Funtion of confirm to Sweet Aleert
  const confirmDelete = (id) => {
    MySwal.fire({
      title: 'Remove the product?',
      text: "You won't ne anle to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire('Delete', 'Your file has been deleted.', 'success')
      }
    })
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className='"col-span-12'>
            <div className="overflow-auto lg:overflow-visible">
              <h1 className="font-bold p-3 text-lg text-center mb-4 text-gray-500">
                Example Firebase CRUD -React JS, Vite JS
              </h1>
              <Link
                to={`/create`}
                className="mt-4 mx-auto hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm max-w-fit"
              >
                Add
              </Link>
              <table className="table mx-auto text-gray-400 border-separate space-y-6 text-sm">
                <thead>
                  <tr className="bg-gray-800 text-gray-500">
                    <th className="p-3">Description</th>
                    <th className="p-3 text-left">Stock</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(({ id, description, stock }) => (
                    <tr className="bg-gray-800" key={id}>
                      <td className="p-3">{description}</td>
                      <td className="p-3">{stock}</td>
                      <td className="p-3">
                        <div>
                          <Link
                            className="text-green-500 hover:text-gray-100 mr-2"
                            to={`/edit/${id}`}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <button
                            className="text-red-600 hover:text-gray-100 mx-2"
                            onClick={() => confirmDelete(id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Show

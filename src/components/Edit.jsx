import { async } from '@firebase/util'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebaseConfig/firebase'

const Edit = () => {
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)
  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, 'products', id)
    const data = { description: description, stock: stock }
    await updateDoc(product, data)
    navigate('/')
  }

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, 'products', id))
    if (product.exists()){
      setDescription(product.data().description)
      setStock(product.data().stock)
    } else {
      console.log('El producto no existe')
    }
  }

  useEffect(() => {
    getProductById(id)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className='col-span-12'>
        <div className="overflow-auto lg:overflow-visible">
          <h1 className="font-bold p-3 text-lg text-center mb-4 text-gray-500">Update Product</h1>
          <form className='mx-auto max-w-screen-lg' onSubmit={update}>
            <div className="mb-4 relative flex h-10 w-full flex-row-reverse overflow-clip rounded-lg">
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                className="peer w-full rounded-r-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                value={description}
              />
              <label
                htmlFor="description"
                className="flex items-center rounded-l-lg border border-slate-400 bg-slate-50 px-2 text-sm text-slate-400 transition-colors duration-300 peer-focus:border-sky-400 peer-focus:bg-sky-400 peer-focus:text-white"
              >
                Description
              </label>
            </div>
            <div className="mb-4 relative flex h-10 w-full flex-row-reverse overflow-clip rounded-lg">
              <input
                type="number"
                onChange={(e) => setStock(e.target.value)}
                className="peer w-full rounded-r-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                value={stock}
              />
              <label
                htmlFor="stock"
                className="flex items-center rounded-l-lg border border-slate-400 bg-slate-50 px-2 text-sm text-slate-400 transition-colors duration-300 peer-focus:border-sky-400 peer-focus:bg-sky-400 peer-focus:text-white"
              >
                Stock
              </label>
            </div>
            <button className='mt-4 mx-auto hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm max-w-fit' type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit



const SetActualizar = ({ dat, data, setData, editData, EditChange, inputRef, index }) => {
    
    return (
        
        <tr key={data.id} style={{position:'relative'}} >
            <td>{data.id}{index}</td>
            
            <td><input id='nombreIDx' type="text" required="required" name="inputNombre" defaultValue={editData.inputNombre}
                onChange={EditChange} /* ref={inputRef} */ />
            </td>
            <td>
                <input id='fechaActualIDx' type="text" required="required" name="inputFechaActual" defaultValue={editData.inputFechaActual}
                onChange={EditChange} />
            </td>
          
            <td>
         <label htmlFor="estadoIDx">Estado:
                       <select id="estadoIDx"required="required" name="inputEstado" defaultValue={editData.inputEstado}
                        onChange={EditChange} placeholder="Estado"  >
                        <option value="pagado" selected>Pagado</option>
                        <option value="No pagado">No pagado</option>
                    </select>
 </label><br /><br />
            </td>
            <td>
                <input id='importeUSDIDx' type="text" required="required" name="inputImporteUSD" defaultValue={editData.inputImporteUSD}
                onChange={EditChange} />
            </td>
            
            <td><button type='submit' >update</button></td>
        </tr>
    )
}

export default SetActualizar
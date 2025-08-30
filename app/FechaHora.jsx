'use client'
export default function fechaHora(){
        useEffect(() => {
        const timerID = setInterval(() => {
          setFechaActual(new Date());
        }, 1000);
        return () => {
          clearInterval(timerID);
        };
      }, []);  
}
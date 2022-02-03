import Prestador from "./Prestador";
import PrestadorData from './types'

test("should accept if type of Prestador is médicos médicos, enfermeiros, fisioterapeutas, dentistas", function(){
 const data: PrestadorData = {
     name: 'João',
     cnpj: '02332886000104',
     type: 'enfermeiro'
    }

 const prestador = new Prestador(data)
 const acceptsPrestadorTypes = ['medico', 'enfermeiro', 'fisioterapeuta', 'dentista']

 expect(acceptsPrestadorTypes).toContain(prestador.type)
});


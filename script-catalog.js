class Elev {
    //constructorul se apeleaza cand faci new Elev()
    constructor(nume){
        //cu this ne referim la elevul curent 
        //in this salvam info despre elev: nume,note
        this.nume = nume;
        this.note = [];
        this.medii=[];
    }
    //metoda care o apelam sa calculeze media
    medie(){
        //daca nu are note returnam un string gol pt ca 0/0 e operatie nedefinita in matematica
        if(this.note.length===0){
            return "";
        }else{
            //calculam efectiv media;
            var suma = 0;
            for(var i=0;i<this.note.length;i++){
                suma+=this.note[i];
            }
            this.medii=suma/this.note.length;
            return suma/this.note.length;
            
        }
    }
    addNota(nota){
        //adaugam o nota la notele elevului
        this.note.push(nota);
    }
  
}
//unde salvam catalogul de note
var listaElevi = [];
//salvam indexul elevului pe care am dat click (butonul afiseaza note)
var indexElev = -1;
function adaugaElev(event){
    //sa nu se reincarce pagina
    event.preventDefault();
    //preluam numele din formular
    var nume = document.querySelector("[name='nume']").value;
    //creem un elev nou si il bagam in lista de elevi
    listaElevi.push(new Elev(nume));
    //desenam tabelul cu elevi
    drawElevi();
    document.querySelector("#elev").reset();
}
function drawElevi(){
    var str="";
    var strHead=`
    <tr><th><input type="button" value="Sorteaza ascendent dupa medie note" onclick="sortAscMedie(event);" style="width:250px;"></th></tr>
			<tr><th><input type="button" value="Sorteaza descendent dupa medie note" onclick="sortDescMedie(event);" style="width:250px;"></th></tr><tr>
    <th>Nume</th>
    <th>Medie</th>
    <th></th>
</tr>`;
    for(var i=0;i<listaElevi.length;i++){
        str+=`
            <tr>
                <td>${listaElevi[i].nume}</td>
                <td>${listaElevi[i].medie()}</td>
                <td><input type="button" value="Vezi notele" onclick="editeazaElev(${i});" /></td>
            </tr>
        
        `;
        
    }
    //modificam doar tbody din tabel ca sa ramana capul de tabel pe loc
    document.querySelector("#tableElevi thead").innerHTML = strHead;
    document.querySelector("#tableElevi tbody").innerHTML = str;
}
function drawNote(){
    //luam elevul in functie de indexul salvat global cu functia editeazaElev
    var elev = listaElevi[indexElev];
    //notele elevului
    var note = elev.note;
    var str="";
    for(var i=0;i<note.length;i++){
        str+=`
            <tr>
                <td>${note[i]}<td>
            </tr>
        
        `;
    }
    document.querySelector("#tableNote tbody").innerHTML = str;
}

function editeazaElev(index){

    indexElev=index;
    drawNote();
    document.querySelector("#note_elev_wrapper").classList.remove("hidden");
    document.querySelector("#note_elev_wrapper").classList.add("note_elevi_comprised");
    document.querySelector("#lista_elevi_wrapper").classList.add("lista_elevi_comprised");
    var obj= listaElevi[indexElev];
    var str="";
    str=obj.nume;
    document.querySelector("#note-elev-nume").innerHTML=`Note elev: `+ str;
}
function adaugaNota(event){
    event.preventDefault();
    var nota = document.querySelector("[name='nota']").value;
    notaNumeric = Number(nota);
    listaElevi[indexElev].addNota(notaNumeric);
    drawElevi();
    drawNote();
    document.querySelector("#nota").reset();
}
function ascundeNotele(){
    document.querySelector("#note_elev_wrapper").classList.add("hidden");
    document.querySelector("#lista_elevi_wrapper").classList.remove("lista_elevi_comprised");
    document.querySelector("#note_elev_wrapper").classList.remove("note_elevi_comprised");
}
function sortAscNote(event){
    var obj =listaElevi[indexElev]["note"]; 
    var a =obj.sort(function(a, b){return a-b});
    drawNote();
}
function sortDescNote(event){
    var obj =listaElevi[indexElev]["note"]; 
    var a =obj.sort(function(a, b){return b-a});
    drawNote();
}
function sortAscMedie(event){
    listaElevi.sort(function(a, b){return a.medii-b.medii});
    drawElevi();
}
function sortDescMedie(event){
    listaElevi.sort(function(a, b){return b.medii-a.medii});
    drawElevi();
}



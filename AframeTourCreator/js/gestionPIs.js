$ = (el) => document.querySelector(el);
$$ = (el) => document.querySelectorAll(el);

var mapPosPoints = new Map();
<<<<<<< HEAD

document.addEventListener('keypress', (event) => {
  const Touche = event.key;
  if(Touche=='z'){
    alert("appui z");
  	var dist = 5;
  	var angle = ($("#camera").getAttribute("rotation").y+$("#cameraRotation").getAttribute("rotation").y) * Math.PI / 180;
  	var xPos = -dist*Math.sin(angle);
  	var zPos = -dist*Math.cos(angle);
  	ajouterPointInteret(`${xPos} 0 ${zPos}`);
  }
});


document.addEventListener('keypress', (event) => {
  const Touche = event.key;
  if(Touche=='r'){
  	var el = $("#cursor").components.raycaster.intersectedEls[0];
  	if(el !== undefined){
	  	if(confirm("supprimer?")){
	  		supprimer(el);
	  	}
	  }
  }
});

=======
var addEnCours=false;
var lieu="";

function placementPoint(point){
  if(lieu=="point"){
    var scroll = event.deltaY/100;
    scrollDown = scroll > 0;
    scrollUp = scroll < 0;
    pos = point.getAttribute("position");
    if((pos.z>=-2 && scrollUp) || (pos.z<=-30 && scrollDown) || (pos.z<-2 && pos.z>-30)){
      pos.z = pos.z+scroll;
    }
    point.setAttribute("position",pos);
  }
}

function placementPann(pann){
  if(lieu=="pann"){
    var scroll = event.deltaY/100;
    scrollDown = scroll > 0;
    scrollUp = scroll < 0;
    posPan = pann.getAttribute("position");
    //alert(pos.z);
    if((posPan.z>=-2 && scrollUp) || (posPan.z<=-15 && scrollDown) || (posPan.z<-2 && posPan.z>-15)){
      //dist = dist+scroll;
      posPan.z=posPan.z+scroll;
    }

  /*        var angle = ($("#camera").getAttribute("rotation").y+$("#cameraRotation").getAttribute("rotation").y) * Math.PI / 180;
    posPan = $("#"+idHud).getAttribute("position");
    var xPos = -dist*Math.sin(angle);
    var zPos = -dist*Math.cos(angle);
    var yPos = dist*Math.tan(angleX);*/
    pann.setAttribute('position',posPan);
  }
}

document.addEventListener('keypress', (event) => {
  const Touche = event.key;
  if(Touche=='a' && !addEnCours){
    alert("Appuyez sur entrée pour valider");
    addEnCours = true;
    lieu="point";
    var point = document.createElement("a-entity");
    point.setAttribute("template", "src: #templateUpdate");
    point.setAttribute("data-target", "");
    point.setAttribute("position", "0 0 -5");
    $("#camera").appendChild(point);

    document.addEventListener('mousewheel', () => { placementPoint(point); });

    document.addEventListener('keypress', (event) => {
      if(event.keyCode==13 && lieu=="point"){
        var dist = -point.getAttribute("position").z;
        var angle = ($("#camera").getAttribute("rotation").y+$("#cameraRotation").getAttribute("rotation").y) * Math.PI / 180;
        var xPos = -dist*Math.sin(angle);
        var zPos = -dist*Math.cos(angle);
        var angleX = ($("#camera").getAttribute("rotation").x+$("#cameraRotation").getAttribute("rotation").x) * Math.PI / 180;
        var yPos = dist*Math.tan(angleX);
        $("#camera").removeChild(point);
        ajouterPointInteret(`${xPos} ${yPos} ${zPos}`);
        document.removeEventListener('mousewheel', placementPoint);
        lieu="";
        addEnCours = false;
      }
    });
  }
  if(Touche=='p' && !addEnCours){
    alert("Appuyez sur entrée pour valider");
    addEnCours = true;
    lieu="pann";
    var dist = 5;
    var pann =  $("#"+idHud);
    var t = $("#"+idHud).getAttribute('text');
    $("#camera").appendChild(pann);
    pann.setAttribute("position", "0 0 -"+dist);
    pann.setAttribute("text",t);
    //$("#cameraRotation").removeChild(pann); 

    document.addEventListener('mousewheel', () => { placementPann(pann); });

    document.addEventListener('keypress', (event) => {
      if(event.keyCode==13 && lieu=="pann"){
        var dist = -pann.getAttribute("position").z;
        var angle = ($("#camera").getAttribute("rotation").y+$("#cameraRotation").getAttribute("rotation").y) * Math.PI / 180;
        var xPos = -dist*Math.sin(angle);
        var zPos = -dist*Math.cos(angle);
        var angleX = (($("#camera").getAttribute("rotation").x+$("#cameraRotation").getAttribute("rotation").x) * Math.PI / 180);
        var yPos = dist*Math.tan(angleX);
        $("#cameraRotation").appendChild(pann);
        pann.setAttribute("text",t);
        //$("#camera").removeChild(pann);
        pann.setAttribute('position',`${xPos} ${yPos} ${zPos}`);
        addEnCours = false;
        lieu="";
        document.removeEventListener('mousewheel', placementPann);
      }
      });

  }
  if(Touche=='r' && !addEnCours){
    var el = $("#cursor").components.raycaster.intersectedEls[0];
    if(el !== undefined){
      if(confirm("supprimer?")){
        supprimer(el);
      }
    }
  }
  if(Touche=='s' && !addEnCours){
    if(confirm("Voulez-vous sauvegarder cette pièce ?")){
      sauvegarder();
    }
  }
});


>>>>>>> devfab
AFRAME.registerComponent('move', {
  schema: {
    on: {type: 'string'},
    target: {type: 'string'}
  },

  init: function(){
<<<<<<< HEAD
    alert("coucou move");
=======
    //alert("coucou move");
>>>>>>> devfab
    var data=this.data;
    var el=this.el;
    var originPlaceName = el.parentNode.parentNode.getAttribute('id');
    var targetElement=$(`#${data.target}`);
    var targetWorldPos = new THREE.Vector3();
    el.addEventListener(data.on, function(){
        var image=$(`#${data.target}Img`);
        if(image.nodeName!="IMG"){
          var source=image.innerHTML;
          var parentImage=image.parentNode;
          parentImage.removeChild(image);
          image=document.createElement("img");
          image.setAttribute("id", `${data.target}Img`);
          image.setAttribute("crossorigin", "anonymous");
          image.setAttribute("src", source);
          parentImage.appendChild(image);
        }
        $("#background").setAttribute('src', `#${data.target}Img`);

        var elementToHaveInTheBack=elementInWithTarget(data.target, originPlaceName);
        if (typeof elementToHaveInTheBack !== 'undefined') {
          targetWorldPos.setFromMatrixPosition(elementToHaveInTheBack.object3D.matrixWorld);
          $("#cameraRotation").setAttribute("rotation", `0 ${Math.atan2(targetWorldPos.x, targetWorldPos.z)*(180/Math.PI)-$("#camera").getAttribute("rotation").y} 0`);
        }
        
        
        el.parentNode.parentNode.setAttribute('visible','false');       
        el.parentNode.parentNode.removeAttribute("current");
        targetElement.setAttribute('visible', 'true');
        targetElement.setAttribute("current","");
<<<<<<< HEAD
        $("#hud").setAttribute('text','value', targetElement.getAttribute('description'));
=======
        $("#"+idHud).setAttribute('text','value', targetElement.getAttribute('description'));
>>>>>>> devfab
        $("#cursor").setAttribute('raycaster', `objects: #${data.target}`);
      }
    );
  }
});

AFRAME.registerComponent('default', {
  schema: {
  },

  init: function(){
<<<<<<< HEAD
    alert("coucou default");
=======
    //alert("coucou default");
>>>>>>> devfab
    var el = this.el;
    var image=$(`#${el.id}Img`);
    var source=image.innerHTML;
    var parentImage=image.parentNode;
    parentImage.removeChild(image);
    image=document.createElement("img");
    image.setAttribute("id", `${el.id}Img`);
    image.setAttribute("crossorigin", "anonymous");
    image.setAttribute("src", source);
    parentImage.appendChild(image);
    $("#background").setAttribute('src', `#${el.id}Img`);
<<<<<<< HEAD
    $("#hud").setAttribute('text','value', el.getAttribute('description'));
=======
    $("#"+idHud).setAttribute('text','value', el.getAttribute('description'));
>>>>>>> devfab
    el.setAttribute('visible', 'true');
    el.setAttribute("current","");
    $("#cursor").setAttribute('raycaster', `objects: #${el.id}`);
  }
});

<<<<<<< HEAD
AFRAME.registerComponent('description', {
  schema: {type: 'string'}
  }
);

=======
>>>>>>> devfab
AFRAME.registerComponent('sourceimage', {
  schema: {type: 'string'},

  init: function(){
<<<<<<< HEAD
    alert("coucou source");
=======
    //alert("coucou source");
>>>>>>> devfab
    var div = document.createElement("div");
    div.setAttribute("id", this.el.getAttribute("id")+"Img");
    div.innerHTML=this.data;
    $("a-assets").appendChild(div);
  }
});

<<<<<<< HEAD
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function ajouterPointInteret(pos){
=======

function ajouterPointInteret(pos){              
>>>>>>> devfab
    if(typeof(listImgs)=="undefined"){
      alert("Erreur");
      return;
    }
    var l = listImgs.split(':');
    var currentPlace = $(".imsky");
    var point = document.createElement("a-entity");
    point.setAttribute("template", "src: #template");
    var target = window.prompt("Destination ( nom de l'image (sans l'extension))?");
    if(target==null){
      return;
    }
    while(l.includes(target)==false){
      alert("Destination incorrect");
      var target = window.prompt("Destination ( nom de l'image (sans l'extension))?");
<<<<<<< HEAD
    }
    alert(target);
    alert(currentPlace.getAttribute("id"));
=======
      if(target==null){
        return;
      }
    }
    //alert(target);
    //alert(currentPlace.getAttribute("id"));
>>>>>>> devfab
    if(target == currentPlace.getAttribute("id")){
      alert("impossible de mettre un point là ou on est déjà");
      return;
    }
    point.setAttribute("data-target", target);
    point.setAttribute("position", pos);
    currentPlace.appendChild(point);
    var lieuPresent = mapPosPoints.get(point.parentNode.getAttribute("id"));
    if(lieuPresent === undefined){
      mapPosPoints.set(point.parentNode.getAttribute("id"), new Map());
      lieuPresent = mapPosPoints.get(point.parentNode.getAttribute("id"));
    }
    lieuDest = lieuPresent.get(point.getAttribute("data-target"));
    if(lieuDest === undefined){
      lieuPresent.set(point.getAttribute("data-target"), pos);
    }
<<<<<<< HEAD
}

=======


    var form = $("#pointsForm");
    var inputPos = document.createElement("input");
    inputPos.setAttribute("type", "text");
    inputPos.setAttribute("name", "pointsPos["+currentPlace.getAttribute('id')+"][]");
    inputPos.setAttribute("hidden", "");
    inputPos.setAttribute("value", pos);

    var inputTarget = document.createElement("input");
    inputTarget.setAttribute("type", "text");
    inputTarget.setAttribute("name", "pointsTarget["+currentPlace.getAttribute('id')+"][]");
    inputTarget.setAttribute("hidden", "");
    inputTarget.setAttribute("value", target);

    form.appendChild(inputPos);
    form.appendChild(inputTarget);
}

function ajouterPointInteretDebut(pos,target){              
    var currentPlace = $(".imsky");
    var point = document.createElement("a-entity");
    point.setAttribute("template", "src: #template");
    point.setAttribute("data-target", target);
    point.setAttribute("position", pos);
    //point.setAttribute('bmfont-text','text: HELLO!; color: #333');
    currentPlace.appendChild(point);
/*    var lieuPresent = mapPosPoints.get(point.parentNode.getAttribute("id"));
    if(lieuPresent === undefined){
      mapPosPoints.set(point.parentNode.getAttribute("id"), new Map());
      lieuPresent = mapPosPoints.get(point.parentNode.getAttribute("id"));
    }
    lieuDest = lieuPresent.get(point.getAttribute("data-target"));
    if(lieuDest === undefined){
      lieuPresent.set(point.getAttribute("data-target"), pos);
    }*/
}


>>>>>>> devfab
function supprimer(el){
  var lieuPresent = mapPosPoints.get(el.parentNode.parentNode.getAttribute("id"));
  if(lieuPresent !== undefined){
    lieuPresent.delete(el.parentNode.getAttribute("data-target"));
  }
  el.parentNode.parentNode.removeChild(el.parentNode);
}
<<<<<<< HEAD
=======

function sauvegarder(){
  document.getElementById("pointsForm").submit();
}
>>>>>>> devfab

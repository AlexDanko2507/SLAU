var mas=[];
var res=[];
var x=[];
var keyAlert=0;

function keyJump(evt, ob) {
	var kol=parseInt(document.getElementById("kol").value);
  evt = window.event ? window.event : evt;
  if (!evt.ctrlKey) return;
  for(var i=0;  document.getElementsByClassName('lock')[i] != ob; i++) {}
  	var lengthLock=document.getElementsByClassName('lock').length;

	  if (evt.keyCode == 37 && i > 0) {
	    document.getElementsByClassName('lock')[i-1].focus();
	  }
	  if (evt.keyCode == 39 && i < lengthLock - 1) {
	    document.getElementsByClassName('lock')[i+1].focus();
	  }
	   if (evt.keyCode == 39 && i == lengthLock-1) {
	    document.getElementsByClassName('lock')[0].focus();
	  }
	    if (evt.keyCode == 37 && i == 0) {
	    document.getElementsByClassName('lock')[lengthLock-1].focus();
	  }

		    if (evt.keyCode == 40 && i < lengthLock-(kol+1) ) {
    document.getElementsByClassName('lock')[i+kol+1].focus();
  }

   if (evt.keyCode == 40 && i > lengthLock-(kol+2) ) {
    document.getElementsByClassName('lock')[i-(lengthLock-(kol+1))].focus();
  }

   if (evt.keyCode == 38 && i > kol ) {
    document.getElementsByClassName('lock')[i-(kol+1)].focus();
  }

  if (evt.keyCode == 38 && i < kol+1 ) {
    document.getElementsByClassName('lock')[i+(lengthLock-(kol+1))].focus();
  }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function lockerWR(kol)
  {
    for(i=0;i<kol+1;i++)
    {
    document.getElementsByClassName('lock')[i].onkeypress = function(e) {

      e = e || event;

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      var chr = getChar(e);

 
      if (chr == null) return;
      if ((chr < '0' || chr > '9') && chr!='.' && chr!='/' && chr!='-') {
        return false;
      }

    }

    function getChar(event) {
      if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
      }

      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
      }

      return null; // специальная клавиша
    }
   }
  }

function readKol()
{
var answer=document.getElementById('answer');
var kol=document.getElementById("kol").value;
var matrix = document.getElementById('matrix');
var buf='';
answer.innerHTML='';
var cols=parseInt(kol)+1;
matrix.innerHTML='<th colspan="'+cols+'" style="text-align:left; font-style: italic; font-weight:normal;">Матрица <br>коэффицентов</th><th style="text-align:left; font-style: italic; font-weight:normal;">Свободные <br>члены</th>';

for(var i=0;i<kol;i++)
	{
		buf+='<tr>';
		for(var j=0;j<kol;j++)
		{
			buf+='<td><input  onkeydown="keyJump(event,this)" class="lock" size="7"'+'id="'+i+j+'"></td>';
		}
		buf+='<td><input size="1" style="visibility: hidden;"></td><td><input  onkeydown="keyJump(event,this)" class="lock" size="7"'+'id="'+i+'"></td>'
		buf+='</tr>';
	}
	matrix.innerHTML+=buf;
	
	switch(kol)
	{
	case '2':document.getElementById('answer').style.height=(document.documentElement.clientHeight-document.getElementById('mathUR').style.height-390)+'px';
	break;
	case '3':document.getElementById('answer').style.height=(document.documentElement.clientHeight-document.getElementById('mathUR').style.height-410)+'px';
	break;
	case '4':document.getElementById('answer').style.height=(document.documentElement.clientHeight-document.getElementById('mathUR').style.height-430)+'px';
	break;
	case '5':document.getElementById('answer').style.height=(document.documentElement.clientHeight-document.getElementById('mathUR').style.height-450)+'px';
	break;
	case '6':document.getElementById('answer').style.height=(document.documentElement.clientHeight-document.getElementById('mathUR').style.height-470)+'px';
	break;
	case '7':document.getElementById('answer').style.height=(document.documentElement.clientHeight-document.getElementById('mathUR').style.height-490)+'px';
	break;
	}
	lockerWR(kol*kol+kol);

}	


function mathMatrix()
{
	var a,b;
	var poisk='/';
	var dr;
	var answer=document.getElementById('answer');
	var kol=document.getElementById("kol").value;
	keyAlert=0;
	for(var i=0;i<kol;i++)
	{
		mas[i]=[];
	}
	for(var i=0;i<kol;i++)
	{
		a=""+i+"";
		for(var j=0;j<kol;j++)
		{
			b=""+i+j+"";
			if(!document.getElementById(b).value)
			{
				keyAlert++;
			}
			if ((document.getElementById(b).value).search(poisk)!=(-1))
			{
				dr=(document.getElementById(b).value).split(poisk);
				mas[i][j]=parseFloat(dr[0]/dr[1]);
			}
			else
			{
				mas[i][j]=parseFloat(document.getElementById(b).value);
			}
		}
		if(!document.getElementById(a).value)
		{
			keyAlert++;
		}
		if((document.getElementById(a).value).search(poisk)!=(-1))
		{
			dr=(document.getElementById(a).value).split(poisk);
			res[i]=parseFloat(dr[0]/dr[1]);
		}
		else
		{
			res[i]=parseFloat(document.getElementById(a).value);
		}
	}
	if(keyAlert!=0)
	{
		answer.innerHTML='<center><h1 style="color:red;">ОШИБКА</h1><br><h3>Пожалуйста, заполните все поля<h3></center>';
	}
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ZeidelEnd(x,x1,n,eps)
{
	var i;
	for (i = 0; i<n; i++)
	{
		if (Math.abs(x[i] - x1[i])>eps)
			return 0;
	}
	return 1;
}

function PoiskMAX(a,n)
{
	var maxel;
	maxel=a[0];
	for (i = 1; i < n; i++)
	{
		if (a[i] > maxel)
		{
			maxel = a[i];
		}
	}
	if (maxel < 1)
		return 1;
	return 0;
}

function GlavDig(a,n)
{
	var i,j,s;
	for (i = 0; i<n; i++)
	{
		s = 0;
		for (j = 0; j<n; j++)
		{
			if (i != j)
				s += Math.abs(a[i][j]);
		}
		if (Math.abs(a[i][i])<s)
			return 0;
	}
	return 1;
}

function ZeidelMethod()
{
	var answer=document.getElementById('answer');
	var size=document.getElementById("kol").value;
	var eps = document.getElementById("valEps").value;
	var temp,maxx;
	var i, j,p=1;
	var x1=[];
	var s, sum;
	var k, index, check;
	var massiv=[];

	if (GlavDig(mas, size)==0)
	{
		for (k = 0; k < size; k++)
		{
			
			maxx = Math.abs(mas[k][k]);
			index = k;
			check = 0;
			for (i = k + 1; i < size; i++)
			{
				if (Math.abs(mas[i][k]) > maxx)
				{
					check++;
					maxx = Math.abs(mas[i][k]);
					index = i;
				}
			}
			
			if (check != 0)
			{
				for (j = 0; j < size; j++)
				{
					temp = mas[k][j];
					mas[k][j] = mas[index][j];
					mas[index][j] = temp;
				}
				temp = res[k];
				res[k] = res[index];
				res[index] = temp;
			}
		}
	}

	if (GlavDig(mas, size)==0)
	{
		answer.innerHTML="Система не имеет главной доминирующей диагонали<br>Преобразуйте систему или выберите другой способ решения";
		return;
	}

	for (i = 0; i < size; i++)
	{
		sum = 0;
		for (j = 0; j < size; j++)
		{
			if (i != j)
			{
				sum += Math.abs(mas[i][j]);
			}
		}
		massiv[i] = Math.abs(sum / mas[i][i]);
	}

	if (PoiskMAX(massiv, size) != 1)
	{
		for (i = 0; i < size; i++)
		{
			sum = 0;
			for (j = 0; j < size; j++)
			{
				if (i != j)
				{
					sum += Math.abs(mas[j][i] / mas[j][j]);
				}
			}
			massiv[i] = sum;
		}
		if (PoiskMAX(massiv, size) != 1)
		{
			s = 0;
			for (i = 0; i < size; i++)
			{
				for (j = 0; j < size; j++)
				{
					if (i != j)
					{
						s += Math.abs(mas[i][j] * mas[i][j] / (mas[i][i] * mas[i][i]));
					}
				}
			}
			s = Math.sqrt(s);
			if (s > 1) 
			{
				answer.innerHTML="Итерационный процесс расходится или закцикливается<br>Выберите другой метод решения";
				return;
			}
		}
	}

	for (i = 0; i<size; i++)
	{
		x1[i] = 0;
		x[i] = 0;
	}
	do
	{
		for (i = 0; i<size; i++)
		{
			s = 0;
			for (j = 0; j<size; j++)
			{
				if (i != j)
					s += mas[i][j] * x[j];
			}
			x[i] = (res[i] - s) / mas[i][i];
		}

		if (ZeidelEnd(x, x1, size, eps))
			break;
		for (i = 0; i<size; i++)
			x1[i] = x[i];
	} while (1);
		answer.innerHTML="ОТВЕТ:<br>";
		for (i=0;i<size;i++)
		{
			answer.innerHTML+='x'+'<sub>'+(i+1)+'</sub>'+'='+x[i]+'<br>';
		}

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GaussMethod()
{
	var answer=document.getElementById('answer');
	var size=document.getElementById("kol").value;
	var eps=0.00001;
	var i, j, k, l,coef,temp,sum=0;

	for (i = 0; i < size; i++)
	{
		for (j = 0; j < size; j++)
		{
			if (i == j && mas[j][i] == 0)
			{
				for (k = j + 1; k < size; k++)
				{
					if (mas[k][j] != 0)
					{
						for (l = 0; l < size; l++)
						{
							temp = mas[j][l];
							mas[j][l] = mas[k][l];
							mas[k][l] = temp;
						}
						temp = res[j];
						res[j] = res[k];
						res[k] = temp;
					}
				}
			}
		}
	}

for (j = 0; j < size; j++) /*треугольная матрица*/
	{
		for (i = 0; i < size; i++)
		{
			if (i>j)
			{
				if (mas[j][j] == 0)
				{
					answer.innerHTML="ОТВЕТ: <br>Система несовместна и имеет бесконечное множество решений";
					return;
				}
				coef = mas[i][j] / mas[j][j];
				for (k = 0; k < size; k++)
				{
					mas[i][k] = mas[i][k] - coef*mas[j][k];
				}
				res[i] = res[i] - coef*res[j];
			}
		}
	}

if (((Math.abs(mas[size - 1][size - 1]) < eps) || mas[size - 1][size - 1] == 0) && res[size - 1] == 0)
	{
		answer.innerHTML="ОТВЕТ: <br>Система несовместна и имеет бесконечное множество решений";
		return;
	}
if (((Math.abs(mas[size - 1][size - 1]) < eps) || mas[size - 1][size - 1]==0) && res[size - 1] != 0)
{
	answer.innerHTML="ОТВЕТ: <br>Система несовместна и не имеет решений";
	return;
}

	x[size - 1] = res[size - 1] / mas[size - 1][size - 1];
	/*подстановка обратно*/
	for (i = size - 2; i >= 0; i--)
	{
		sum = 0;
		for (j = i + 1; j < size; j++)
		{
			sum = sum + mas[i][j] * x[j];
		}
		x[i] = (res[i] - sum) / mas[i][i];
	}
		answer.innerHTML="ОТВЕТ:<br>";
		for (i=0;i<size;i++)
		{
			answer.innerHTML+='x'+'<sub>'+(i+1)+'</sub>'+'='+x[i]+'<br>';
		}
}

function GaussVMethod()
{
	var answer=document.getElementById('answer');
	var size=document.getElementById("kol").value;
	var eps=0.00001;
	var i, j, k, l,coef,temp,sum=0,index,check,max;

	for (k = 0; k < size; k++)
	{
		// Поиск строки с максимальным mas[i][k]
		max = Math.abs(mas[k][k]);
		index = k;
		check = 0;
		for (i = k + 1; i < size; i++)
		{
			if (Math.abs(mas[i][k]) > max)
			{
				check++;
				max = Math.abs(mas[i][k]);
				index = i;
			}
		}
		// Перестановка строк
		if (check != 0)
		{
			for (j = 0; j < size; j++)
			{
				temp = mas[k][j];
				mas[k][j] = mas[index][j];
				mas[index][j] = temp;
			}
			temp = res[k];
			res[k] = res[index];
			res[index] = temp;
		}
		// Нормализация уравнений
		for (i = 0; i < size; i++)
		{
			if (i > k)
			{
				if (mas[k][k] == 0)
				{
					answer.innerHTML="ОТВЕТ: <br>Система несовместна и имеет бесконечное множество решений";
					return;
				}
				coef = mas[i][k] / mas[k][k];
				for (j = 0; j < size; j++)
				{
					mas[i][j] = mas[i][j] - coef*mas[k][j];
				}
				res[i] = res[i] - coef*res[k];
			}
		}
	}

	if (((Math.abs(mas[size - 1][size - 1]) < eps) || mas[size - 1][size - 1] == 0) && res[size - 1] == 0)
	{
		answer.innerHTML="ОТВЕТ: <br>Система несовместна и имеет бесконечное множество решений";
		return;
	}
	if (((Math.abs(mas[size - 1][size - 1]) < eps) || mas[size - 1][size - 1] == 0) && res[size - 1] != 0)
	{
		answer.innerHTML="ОТВЕТ: <br>Система несовместна и не имеет решений";
		return;
	}
	// обратная подстановка
	x[size - 1] = res[size - 1] / mas[size - 1][size - 1];
	/*подстановка обратно*/
	for (i = size - 2; i >= 0; i--)
	{
		sum = 0;
		for (j = i + 1; j < size; j++)
		{
			sum = sum + mas[i][j] * x[j];
		}
		x[i] = (res[i] - sum) / mas[i][i];
	}
		answer.innerHTML="ОТВЕТ:<br>";
		for (i=0;i<size;i++)
		{
			answer.innerHTML+='x'+'<sub>'+(i+1)+'</sub>'+'='+x[i]+'<br>';
		}
}

function methods()
{
	mathMatrix();
	var method=document.getElementById('method').value;
	var Gauss='Метод Гаусса';
	var GaussV='Метод Гаусса с выбором главного элемента';
	var Zeidel='Метой Зейделя';
	switch (method)
	{
		case Gauss:
		if(keyAlert==0)
		{
			GaussMethod();
		}
		break;
		case GaussV:
		if(keyAlert==0)
		{
			GaussVMethod();
		}
		break;
		case Zeidel:
		if(keyAlert==0)
		{
			ZeidelMethod();
		}
		break;
	}

}

function visibleEps()
{
	document.getElementById('epsvalue').style.visibility='hidden';
	var method=document.getElementById('method').value;
	var Zeidel='Метой Зейделя';
	if(method===Zeidel)
	{
		document.getElementById('epsvalue').style.visibility='visible';
	}
}
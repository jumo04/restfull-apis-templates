#  RESTFULL APIS Templates

## Descripcion

El proposito de este repositorio es tener diferentes templates de apis para crear forks cuando se necesite una de diferentes versiones y con diferentes tecnologias

## Uso

* Clonar respositorio o capeta con el siguiente comando
```sh
git clone -n --depth=1 --filter=tree:0 https://github.com/jumo04/restfull-apis-templates.git
```
* Ingresar a la carpeta
```sh
cd restfull-apis-templates
```
* Descarga solo la carpeta que quieres usar
```sh
git sparse-checkout set --no-cone api-restfull
```

* Usamos git checkout para finalizar
```sh
git checkout
```


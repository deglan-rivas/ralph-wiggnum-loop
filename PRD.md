# Plan: CRUD Backend de Pokemones con Express + TypeScript

## Objetivo
Crear un API REST backend sencillo con CRUD completo para la entidad "Pokemon", usando Node.js + Express + TypeScript con almacenamiento en memoria.

## Ubicación
Reemplazar contenido de `ralph-wiggum-loop/` con el nuevo proyecto.

## Estructura Final del Proyecto
```
ralph-wiggum-loop/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts                 (servidor Express)
│   ├── models/
│   │   └── pokemon.model.ts     (interfaz Pokemon)
│   ├── repositories/
│   │   └── pokemon.repository.ts (almacenamiento en memoria)
│   ├── controllers/
│   │   └── pokemon.controller.ts (lógica CRUD)
│   └── routes/
│       └── pokemon.routes.ts     (definición de rutas)
└── README.md                     (documentación de uso)
```

## Modelo de Datos: Pokemon
```typescript
interface Pokemon {
  id: number;
  name: string;
  type: string;      // ej: "fire", "water", "grass", "electric"
  level: number;     // 1-100
}
```

## Endpoints del API
```
GET    /api/pokemon        - Listar todos los pokemones
GET    /api/pokemon/:id    - Obtener un pokemon por ID
POST   /api/pokemon        - Crear un nuevo pokemon
PUT    /api/pokemon/:id    - Actualizar un pokemon existente
DELETE /api/pokemon/:id    - Eliminar un pokemon
```

---

## PASO 1: Setup inicial del proyecto

### Acciones:
1. Limpiar contenido anterior de `ralph-wiggum-loop/`
   - Eliminar archivos existentes (mantener solo el directorio)

2. Crear `package.json`
   - name: `pokemon-crud-api`
   - type: `module`
   - scripts:
     - `dev`: `tsx watch src/index.ts`
     - `build`: `tsc`
     - `start`: `node dist/index.js`
   - dependencies:
     - `express`
     - `@types/express`
   - devDependencies:
     - `typescript`
     - `tsx` (para desarrollo con hot reload)

3. Crear `tsconfig.json`
   - target: `ES2022`
   - module: `ESNext`
   - moduleResolution: `bundler`
   - outDir: `./dist`
   - rootDir: `./src`
   - strict: `true`
   - esModuleInterop: `true`

4. Crear estructura de directorios
   - `src/models/`
   - `src/repositories/`
   - `src/controllers/`
   - `src/routes/`

5. Instalar dependencias
   - Ejecutar `pnpm install`

### Verificación:
- Comando `pnpm install` completa sin errores
- Estructura de directorios existe

---

## PASO 2: Crear modelo y repositorio

### Acciones:
1. Crear `src/models/pokemon.model.ts`
   - Definir interfaz `Pokemon` con campos: id, name, type, level
   - Exportar interfaz

2. Crear `src/repositories/pokemon.repository.ts`
   - Array en memoria: `let pokemons: Pokemon[] = []`
   - Variable contador: `let nextId = 1`
   - Métodos:
     - `getAll(): Pokemon[]` - retorna todos
     - `getById(id: number): Pokemon | undefined` - busca por id
     - `create(pokemon: Omit<Pokemon, 'id'>): Pokemon` - crea con id auto-incremental
     - `update(id: number, data: Partial<Omit<Pokemon, 'id'>>): Pokemon | null` - actualiza campos
     - `delete(id: number): boolean` - elimina y retorna true/false
   - Datos iniciales de ejemplo (2-3 pokemones pre-cargados)

### Verificación:
- Archivos creados correctamente
- Código TypeScript sin errores de sintaxis

---

## PASO 3: Crear controladores y rutas

### Acciones:
1. Crear `src/controllers/pokemon.controller.ts`
   - Importar repositorio
   - Funciones controladoras (Request, Response):
     - `listPokemons` - llama a `getAll()`
     - `getPokemon` - llama a `getById()`, retorna 404 si no existe
     - `createPokemon` - valida body, llama a `create()`, retorna 201
     - `updatePokemon` - valida body, llama a `update()`, retorna 404 si no existe
     - `deletePokemon` - llama a `delete()`, retorna 404 si no existe
   - Manejo de errores básico

2. Crear `src/routes/pokemon.routes.ts`
   - Importar express Router
   - Importar controladores
   - Definir rutas:
     - `GET /` → listPokemons
     - `GET /:id` → getPokemon
     - `POST /` → createPokemon
     - `PUT /:id` → updatePokemon
     - `DELETE /:id` → deletePokemon
   - Exportar router

### Verificación:
- Archivos creados correctamente
- Imports correctos entre módulos
- Código TypeScript compila sin errores

---

## PASO 4: Crear servidor Express

### Acciones:
1. Crear `src/index.ts`
   - Importar express
   - Importar router de pokemon
   - Configurar middleware `express.json()`
   - Montar router en `/api/pokemon`
   - Puerto: 3000 (configurable con ENV)
   - Mensaje de inicio: "Server running on http://localhost:3000"

2. Compilar proyecto
   - Ejecutar `pnpm build`
   - Verificar que existe `dist/`

### Verificación:
- Compilación exitosa
- Servidor inicia sin errores con `pnpm dev`
- Mensaje de confirmación visible en consola

---

## PASO 5: Prueba manual de endpoints

### Acciones:
1. Iniciar servidor en modo desarrollo
   - Ejecutar `pnpm dev`

2. Probar endpoints con curl o similar:
   - **GET /api/pokemon** - listar todos (debe mostrar pokemones iniciales)
   - **POST /api/pokemon** - crear nuevo:
     ```json
     {"name": "Pikachu", "type": "electric", "level": 25}
     ```
   - **GET /api/pokemon/:id** - obtener el recién creado
   - **PUT /api/pokemon/:id** - actualizar level a 30
   - **DELETE /api/pokemon/:id** - eliminar el creado
   - **GET /api/pokemon/:id** - verificar 404

3. Crear `README.md` con:
   - Descripción del proyecto
   - Comandos para instalar y ejecutar
   - Ejemplos de uso de cada endpoint con curl

### Verificación:
- Todos los endpoints responden correctamente
- CRUD completo funciona (Create, Read, Update, Delete)
- Status codes correctos (200, 201, 404)
- Datos persisten en memoria durante la ejecución
- README documenta correctamente el uso

---

## Criterios de Éxito

- ✅ Servidor Express funciona en puerto 3000
- ✅ Los 5 endpoints CRUD responden correctamente
- ✅ TypeScript compila sin errores
- ✅ Almacenamiento en memoria funciona (datos persisten durante ejecución)
- ✅ Status codes HTTP apropiados (200, 201, 404)
- ✅ Body de requests y responses en formato JSON
- ✅ Datos iniciales se cargan al arrancar
- ✅ README documenta cómo usar el API

---

## Comandos de Verificación Final

```bash
# Navegar al proyecto
cd ralph-wiggum-loop

# Instalar dependencias
pnpm install

# Compilar
pnpm build

# Modo desarrollo con hot reload
pnpm dev

# En otra terminal, probar endpoints:
curl http://localhost:3000/api/pokemon
curl http://localhost:3000/api/pokemon/1
curl -X POST http://localhost:3000/api/pokemon \
  -H "Content-Type: application/json" \
  -d '{"name":"Pikachu","type":"electric","level":25}'
curl -X PUT http://localhost:3000/api/pokemon/1 \
  -H "Content-Type: application/json" \
  -d '{"level":30}'
curl -X DELETE http://localhost:3000/api/pokemon/1
```

---

## Archivos Críticos a Crear/Modificar

1. `ralph-wiggum-loop/package.json` - Configuración del proyecto
2. `ralph-wiggum-loop/tsconfig.json` - Configuración TypeScript
3. `ralph-wiggum-loop/src/models/pokemon.model.ts` - Modelo de datos
4. `ralph-wiggum-loop/src/repositories/pokemon.repository.ts` - Lógica de almacenamiento
5. `ralph-wiggum-loop/src/controllers/pokemon.controller.ts` - Controladores CRUD
6. `ralph-wiggum-loop/src/routes/pokemon.routes.ts` - Definición de rutas
7. `ralph-wiggum-loop/src/index.ts` - Servidor Express
8. `ralph-wiggum-loop/README.md` - Documentación

---

## Notas de Implementación

- El repositorio mantiene los datos en un array en memoria
- Los datos se pierden al reiniciar el servidor (comportamiento esperado)
- No hay validación compleja, solo verificaciones básicas
- Errores se manejan con try-catch simple y responses apropiados
- Sin autenticación ni autorización (CRUD público)
- Sin paginación (lista completa siempre)
- IDs son números auto-incrementales simples

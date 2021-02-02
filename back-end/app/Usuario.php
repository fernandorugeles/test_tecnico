<?php

namespace App;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Http\Bean\UsuarioBean;

class Usuario extends Model {

    protected $table = 'TB_USUARIO';

    static function consultar($nombre, $usuario) {
       	$tabla = new Usuario;
        $resultado = array();
        $usuarios = DB::table($tabla->table)
                ->where('nombre', 'like', '%' . $nombre . '%')
                ->where('usuario', 'like', '%' . $usuario . '%')
                ->get();
        foreach ($usuarios as $u) {
            $objeto = new UsuarioBean();
            $objeto->setNombre($u->nombre);
            $objeto->setUsuario($u->usuario);
            $objeto->setId($u->id);
            $resultado[] = $objeto;
        }
        return $resultado;
    }

    static function login($usuario, $clave) {
        $tabla = new Usuario;
        $resultado = array();
        $usuarios = DB::table($tabla->table)
                ->where('usuario', '=', $usuario )
                ->where('clave', '=',  md5($clave))
                ->get();
        foreach ($usuarios as $u) {
            $objeto = new UsuarioBean();
            $objeto->setNombre($u->nombre);
            $objeto->setUsuario($u->usuario);
            $objeto->setId($u->id);
            $resultado[] = $objeto;
        }
        return $resultado;
    }

    static function editar($codigo) {
        $tabla = new Usuario;
        $objeto = new UsuarioBean();
        $usuarios = DB::table($tabla->table)
                ->where('id', '=', $codigo)
                ->get();
        foreach ($usuarios as $u) {
            $objeto->setNombre($u->nombre);
            $objeto->setUsuario($u->usuario);
            $objeto->setId($u->id);
            return $objeto;
        }
        return $objeto;
    }

    static function insertar($obj) {
        $tabla = new Usuario;
        DB::table($tabla->table)
                ->insert([
                    'nombre' => $obj->getNombre(),
                    'usuario' => $obj->getUsuario()
        ]);
    }

    static function actualizar($obj) {
        $tabla = new Usuario;
        DB::table($tabla->table)
                ->where('id', $obj->getId())
                ->update([
                    'nombre' => $obj->getNombre(),
                    'usuario' => $obj->getUsuario()
        ]);
    }

    static function eliminar($llave) {
        $tabla = new Usuario;
        DB::table($tabla->table)
                ->where('id', $llave)
                ->delete();
    }
}

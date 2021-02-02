<?php

namespace App\Http\Bean;

class UsuarioBean {
    public $urlConsulta = "urlConsulta"; 
    public $fase = "I";
    public $resultado = array();
    public $accion = null;
    
    public $id = null;
    public $usuario = null;
    public $nombre = null;
    public $clave = null;
    public $perfil = null;
    public $swActivo = null;
   
    function getFase() {
        return $this->fase;
    }

    function getResultado() {
        return $this->resultado;
    }

    function getAccion() {
        return $this->accion;
    }

    function getId() {
        return $this->id;
    }

    function getUsuario() {
        return $this->usuario;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getClave() {
        return $this->clave;
    }

    function getPerfil() {
        return $this->perfil;
    }

    function getSwActivo() {
        return $this->swActivo;
    }

    function setFase($fase) {
        $this->fase = $fase;
    }

    function setResultado($resultado) {
        $this->resultado = $resultado;
    }

    function setAccion($accion) {
        $this->accion = $accion;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setClave($clave) {
        $this->clave = $clave;
    }

    function setPerfil($perfil) {
        $this->perfil = $perfil;
    }

    function setSwActivo($swActivo) {
        $this->swActivo = $swActivo;
    }

    function setUrlConsulta($urlConsulta) {
        $this->urlConsulta = $urlConsulta;
    }

    function getUrlConsulta() {
        return $this->urlConsulta;
    }
}

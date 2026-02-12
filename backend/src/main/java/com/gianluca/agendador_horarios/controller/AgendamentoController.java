package com.gianluca.agendador_horarios.controller;

import com.gianluca.agendador_horarios.infrastructure.entity.Agendamento;
import com.gianluca.agendador_horarios.services.AgendamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping ("/agendamentos")
@RequiredArgsConstructor

public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<Agendamento> salvarAgendamento(@RequestBody Agendamento agendamento){
        return ResponseEntity.accepted().body(agendamentoService.salvarAgendamento(agendamento));
    }

     @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAgendamentoPorId(@PathVariable Long id) {
    agendamentoService.deletarAgendamentoPorId(id);
    return ResponseEntity.noContent().build();
}
     @GetMapping
    public ResponseEntity<List<Agendamento>> buscarAgendamentosDia(@RequestParam(required = false) LocalDate data){
         if (data != null) {
        return ResponseEntity.ok().body(agendamentoService.buscarAgendamentosDia(data));
    } else {
        return ResponseEntity.ok().body(agendamentoService.listarTodos());
    }
}   

     @PutMapping
    public ResponseEntity<Agendamento> alterarAgendamentos(@RequestBody Agendamento agendamento,
                                                                 @RequestParam(required = false) String cliente,
                                                                 @RequestParam(required = false) LocalDateTime dataHoraAgendamento){
        return ResponseEntity.accepted().body(agendamentoService.alterarAgendamento(agendamento, cliente, dataHoraAgendamento));
     }


}
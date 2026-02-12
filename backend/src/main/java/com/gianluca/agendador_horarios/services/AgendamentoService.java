package com.gianluca.agendador_horarios.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.gianluca.agendador_horarios.infrastructure.entity.Agendamento;
import com.gianluca.agendador_horarios.infrastructure.repository.AgendamentoRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service 
@RequiredArgsConstructor

public class AgendamentoService {

    private final AgendamentoRepository AgendamentoRepository;

    public Agendamento salvarAgendamento(Agendamento agendamento) {
        
        LocalDateTime horaAgendamento = agendamento.getDataHoraAgendamento();
        LocalDateTime horaFim = agendamento.getDataHoraAgendamento().plusHours(1);
        
        Agendamento agendados = AgendamentoRepository.findByServicoAndDataHoraAgendamentoBetween(agendamento.getServico(), horaAgendamento, horaFim);


        if(Objects.nonNull(agendados)){
            throw new RuntimeException("Horário já está preenchido");
        }
        return AgendamentoRepository.save(agendamento);
    }

    public void deletarAgendamentoPorId(Long id) {
    AgendamentoRepository.deleteById(id);
}

    public List<Agendamento> buscarAgendamentosDia(LocalDate data){
        LocalDateTime primeiraHoraDia = data.atStartOfDay();
        LocalDateTime horaFinalDia = data.atTime(23, 59, 59);

        return AgendamentoRepository.findByDataHoraAgendamentoBetween(primeiraHoraDia, horaFinalDia);
    }

    public List<Agendamento> listarTodos() {
    return AgendamentoRepository.findAll();
}

    public Agendamento alterarAgendamento(Agendamento agendamento, String cliente, LocalDateTime dataHoraAgendamento) {
    Agendamento existente = AgendamentoRepository.findById(agendamento.getId())
        .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
    existente.setServico(agendamento.getServico());
    existente.setProfissional(agendamento.getProfissional());
    existente.setDataHoraAgendamento(agendamento.getDataHoraAgendamento());
    existente.setCliente(agendamento.getCliente());
    existente.setTelefoneCliente(agendamento.getTelefoneCliente());
    return AgendamentoRepository.save(existente);
}

}

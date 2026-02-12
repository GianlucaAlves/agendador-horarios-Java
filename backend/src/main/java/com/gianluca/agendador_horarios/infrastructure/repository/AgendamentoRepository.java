package com.gianluca.agendador_horarios.infrastructure.repository;

import com.gianluca.agendador_horarios.infrastructure.entity.Agendamento;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    Agendamento findByServicoAndDataHoraAgendamentoBetween(String servico,LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim);

    @Transactional
    List<Agendamento> findByDataHoraAgendamentoBetween(LocalDateTime dataHoraInicial, LocalDateTime dataHoraFinal);
    Agendamento findByDataHoraAgendamentoAndCliente(LocalDateTime dataHoraAgendamento, String cliente);
    void deleteByClienteAndDataHoraAgendamento(String cliente, LocalDateTime dataHoraAgendamento);

} 

/* eslint-disable prettier/prettier */

import { Agendamento, ObterHorariosOcupados } from '@barba/core';
import { AgendamentoRepository } from './agendamento.repository';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly repo: AgendamentoRepository, private readonly prisma: PrismaService) { }

  @Post()
  criar(@Body() agendamento: Agendamento) {
    return this.repo.criar(agendamento);
  }

  @Get()
  buscarTodos() {
    return this.prisma.agendamento.findMany();
  }

  @Get(':email')
  buscarPorEmail(@Param('email') email: string) {
    return this.repo.buscarPorEmail(email);
  }

  @Get('ocupacao/:profissional/:data')
  buscarOcupacaoPorProfissionalEData(
    @Param('profissional') profissional: string,
    @Param('data') dataParam: string,
  ) {
    const casoDeUso = new ObterHorariosOcupados(this.repo);
    return casoDeUso.executar(+profissional, new Date(dataParam));
  }
}

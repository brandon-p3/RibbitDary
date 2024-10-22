import { Component, OnInit } from '@angular/core';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
  newsArticles: any[] = [];
  topNewsArticles: any[] = []; // Array para almacenar solo las 4 noticias más importantes

  constructor(private proyectService: ProyectsService) {}

  ngOnInit(): void {
    this.proyectService.getTopHeadlines().subscribe((data: any) => {
      this.newsArticles = data.articles;
      this.topNewsArticles = this.newsArticles.slice(0, 4); // Limitar a las primeras 4 noticias
    }, (error) => {
      console.error('Error al obtener las noticias:', error);
    });
  }
}

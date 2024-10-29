import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  constructor(private renderer: Renderer2) {}
  chatOpen: boolean = false;
  ngOnInit(): void {
    this.loadChatbotScript();
  }
  loadChatbotScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', 'nLPx-JsrxWY1IQ7Es7e7e');
    script.setAttribute('domain', 'www.chatbase.co');
    script.defer = true;
    this.renderer.appendChild(document.body, script);
  }

  toggleChat() {
    this.chatOpen = !this.chatOpen;
  }
}
